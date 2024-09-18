function decodeBase64(encoded) {
	if (typeof encoded === 'undefined') {
		return '';
	}
	return decodeURIComponent(escape(window.atob(encoded.replace(/-/g, '+').replace(/_/g, '/'))));
}

function readFileAsBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = function(event) {
			const base64Data = event.target.result.split(',')[1];
			resolve({
				name: file.name,
				type: file.type,
				data: base64Data
			});
		};
		reader.onerror = function(error) {
			reject(error);
		};
		reader.readAsDataURL(file);
	});
}

function getUserEmail() {
	gapi.client.gmail.users.getProfile({
		'userId': 'me'
	}).then(response => {
		const senderEmail = response.result.emailAddress;
		return senderEmail;
	}).catch(error => {
		console.error('Error getting user email:', error);
		return null;
	});
}

function listMessages(pageToken = null) {
	if (!accessToken) {
		console.error('Access token is missing.');
		return;
	}
	$.ajax({
		url: 'https://www.googleapis.com/gmail/v1/users/me/messages',
		method: 'GET',
		headers: {
			'Authorization': 'Bearer ' + accessToken
		},
		data: {
			'labelIds': 'INBOX',
			'maxResults': 5,
			'pageToken': pageToken
		},
		success: (response) => {
			const messages = response.messages;
			if (messages && messages.length > 0) {
				messages.forEach((message) => {
					getMessageDetails(message.id);
				});

				if (response.nextPageToken) {
					nextPageToken = response.nextPageToken;
				}
			} else {
				document.getElementById('content').innerText = 'No messages found.';
			}
		},
		error: (response) => {
			console.error('Error fetching messages: ', response);
		}
	});
}

function getMessageDetails(messageId) {
	$.ajax({
		url: 'https://www.googleapis.com/gmail/v1/users/me/messages/' + messageId,
		method: 'GET',
		headers: {
			'Authorization': 'Bearer ' + accessToken
		},
		success: (response) => {
			const message = response;
			appendToTable(message);
		},
		error: (response) => {
			console.error('Error fetching message details: ', response);
		}
	});
}

/**
 * Append a email message to mail list
 */
function appendToTable(message) {
	const tableBody = document.getElementById('mail-table').querySelector('tbody');
	const headers = message.payload.headers;
	const subjectHeader = headers.find(header => header.name === 'Subject');
	const fromHeader = headers.find(header => header.name === 'From');
	const dateHeader = headers.find(header => header.name === 'Date');
	const subject = subjectHeader ? subjectHeader.value : 'No subject';
	const from = fromHeader ? fromHeader.value : 'No sender';
	const date = dateHeader ? dateHeader.value : 'No date';
	const snippet = message.snippet;

	const row = document.createElement('tr');
	row.className='tr-item';
	row.setAttribute('data-bs-toggle', 'modal');
	row.setAttribute('data-bs-target', '#detailMailModal');
	row.onclick = () => {
		const modalBody = document.getElementById('detailMailModalBody').querySelector('iframe');
		const modalTitle = document.getElementById('detailMailModalLabel');
		const modalTime = document.getElementById('detailMailModalTimeLabel');
		var doc = modalBody.contentDocument || modalBody.contentWindow.document;

		const body = getBody(message.payload);
		modalTitle.innerHTML = subject;
		modalTime.innerHTML = date;
		doc.open();
		doc.write(body);
		doc.close();
	}
	row.innerHTML = `
		<td class='mail-item-from'>${from}</td>
		<td class='mail-item-subject'>${subject}</td>
		<td class='mail-item-snippet'>${snippet}</td>
	`;
	tableBody.appendChild(row);
}

/**
 * Get body of an email message
 */
function getBody(payload) {
	let body = '';
	if (payload.parts) {
		payload.parts.forEach((part) => {
			if (part.mimeType === 'text/html') {
				body = decodeBase64(part.body.data);
			} else if (part.mimeType === 'text/plain' && !body) {
				body = decodeBase64(part.body.data);
			} else if (part.parts) {
				part.parts.forEach((subPart) => {
					if (subPart.mimeType === 'text/html') {
						body = decodeBase64(subPart.body.data);
					} else if (subPart.mimeType === 'text/plain' && !body) {
						body = decodeBase64(subPart.body.data);
					}
				});
			}
		});
	} else {
		body = decodeBase64(payload.body.data);
	}
	return body;
}

/**
 * Construct email based on user input
 * Return base64-encoded message
 */
async function constructEmail() {
	const newMailModalBody = document.getElementById('newMailModalBody');
	const senderEmail = getUserEmail();
	const recipientEmail = newMailModalBody.querySelectorAll('input')[0].value;
	const subjectEmail = newMailModalBody.querySelectorAll('input')[1].value;
	const bodyEmail = newMailModalBody.querySelector('textarea').value;

	// Construct the email message
	var email = '';
	email += `From: ${senderEmail}\r\n`;
	email += `To: ${recipientEmail}\r\n`;
	email += `Subject: ${subjectEmail}\r\n`;
	email += 'Content-Type: multipart/mixed; boundary="boundary_separator"\r\n';
	email += '\r\n'; // Blank line between headers and body

	// Body part of the email (without attachments)
	email += `--boundary_separator\r\n`;
	email += `Content-Type: text/plain; charset="UTF-8"\r\n\r\n`;
	email += `${bodyEmail}\r\n`;

	// Add attachments
	const attachmentFiles = document.getElementById('attachmentInput').files;
	const promises = [];
	for (let i = 0; i < attachmentFiles.length; i++) {
		const file = attachmentFiles[i];
		promises.push(readFileAsBase64(file));
	}

	await Promise.all(promises)
	.then(attachmentDataArray => {
		attachmentDataArray.forEach(attachmentData => {
			email += `--boundary_separator\r\n`;
			email += `Content-Type: ${attachmentData.type}; name="${attachmentData.name}"\r\n`;
			email += `Content-Disposition: attachment; filename="${attachmentData.name}"\r\n`;
			email += `Content-Transfer-Encoding: base64\r\n\r\n`;
			email += attachmentData.data + '\r\n';
		})

		// End of email message
		email += `--boundary_separator--`;
	})
	.catch((error) => console.error("Error getting files", error));

	// Encode the email message as base64
	const base64EncodedEmail = btoa(unescape(encodeURIComponent(email)))
	.replace(/\+/g, '-')
	.replace(/\//g, '_')
	.replace(/=+$/, '');

	return base64EncodedEmail;
}

/**
 * Create new draft
 */
async function createDraft() {
	// Ensure accessToken is available
	if (!accessToken) {
		console.error('Access token is missing.');
		return;
	}

	const emailMessage = await constructEmail();
	
	$.ajax({
		url: 'https://www.googleapis.com/gmail/v1/users/me/drafts',
		method: 'POST',
		headers: {
			'Authorization': 'Bearer ' + accessToken,
			'Content-Type': 'application/json'
		},
		data: JSON.stringify({
			'message': {
				'raw': emailMessage
			}
		}),
		success: function(response) {
			console.log('Draft created successfully:', response);
			// Handle success
			alert("Draft created");
		},
		error: function(xhr, status, error) {
			console.error('Error creating draft:', error);
			// Handle error
			alert("Error creating draft" + JSON.stringify(error));
		}
	});
}

/**
 * Send email
 */
async function sendEmail() {
	// Ensure accessToken is available
	if (!accessToken) {
		console.error('Access token is missing.');
		return;
	}
	
	const emailMessage = await constructEmail();

	// Send the email using the Gmail API
	$.ajax({
		url: 'https://www.googleapis.com/gmail/v1/users/me/messages/send',
		method: 'POST',
		headers: {
			'Authorization': 'Bearer ' + accessToken,
			'Content-Type': 'application/json'
		},
		data: JSON.stringify({
			'raw': emailMessage
		}),
		success: function(response) {
			console.log('Email sent successfully:', response);
			// Handle success
			alert("Email sent");

			// Reset mail input and hide modal
			const newMailModal = bootstrap.Modal.getInstance(document.getElementById('newMailModal'))
			const newMailModalBody = document.getElementById('newMailModalBody');
			newMailModalBody.querySelectorAll('input')[0].value = '';
			newMailModalBody.querySelectorAll('input')[1].value = '';
			newMailModalBody.querySelector('textarea').value = '';
			document.getElementById('attachmentInput').value = '';
			document.getElementById('attachmentList').innerHTML = '';
			newMailModal.hide();
		},
		error: function(xhr, status, error) {
			console.error('Error sending draft:', error);
			// Handle error
			alert("Error sending email" + JSON.stringify(error));
		}
	});
}

/**
 * Retrieve draft and send it
 */
function sendDraft(draftId) {
	// Ensure accessToken is available
	if (!accessToken) {
		console.error('Access token is missing.');
		return;
	}

	// Get the draft message by its ID
	$.ajax({
		url: `https://www.googleapis.com/gmail/v1/users/me/drafts/${draftId}`,
		method: 'GET',
		headers: {
			'Authorization': 'Bearer ' + accessToken
		},
		success: function(response) {
			const draftMessage = response.message;
			// Modify the draft to indicate it should be sent
			draftMessage.id = undefined;
			draftMessage.threadId = undefined;
			draftMessage.labelIds = ['SENT']; // Add the 'SENT' label to mark it as sent

			// Send the modified draft message
			$.ajax({
				url: 'https://www.googleapis.com/gmail/v1/users/me/messages/send',
				method: 'POST',
				headers: {
					'Authorization': 'Bearer ' + accessToken,
					'Content-Type': 'application/json'
				},
				data: JSON.stringify({
					'raw': draftMessage.raw
				}),
				success: function(response) {
					console.log('Draft sent successfully:', response);
					// Handle success
				},
				error: function(xhr, status, error) {
					console.error('Error sending draft:', error);
					// Handle error
				}
			});
		},
		error: function(xhr, status, error) {
			console.error('Error retrieving draft:', error);
			// Handle error
		}
	});
}
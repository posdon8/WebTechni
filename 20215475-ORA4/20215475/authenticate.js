const CLIENT_ID = '420371512875-kji221gg35pl94kvg8rmk3r3dtko052e.apps.googleusercontent.com';
API_KEY = 'AIzaSyDBOnK3WWQqyAlPFB6XHpEh7sHTY6WH8WQ'
const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/gmail.send';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest';

let tokenClient;
let gapiInited = false;
let gisInited = false;
let accessToken = null;
let nextPageToken = null;

/**
 * Callback after API is loaded
 */
function gapiLoaded() {
	gapi.load('client', initializeGapiClient);
}

/**
 * Callback after Google Identity Service is loaded
 */
function gisLoaded() {
	tokenClient = google.accounts.oauth2.initTokenClient({
		client_id: CLIENT_ID,
		scope: SCOPES,
		callback: '', // defined later
	});
	gisInited = true;
}

/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */
async function initializeGapiClient() {
	await gapi.client.init({
		apiKey: API_KEY,
		discoveryDocs: [DISCOVERY_DOC],
	});
	gapiInited = true;
}

/**
 * 
 */
function handleCredentialResponse(response) {
	// Initialize token client
	tokenClient = google.accounts.oauth2.initTokenClient({
		client_id: CLIENT_ID,
		scope: SCOPES,
		callback: (tokenResponse) => {
			accessToken = tokenResponse.access_token;
			document.getElementById('compose-button').style.display = 'inline-block';
			document.getElementById('refresh-button').style.display = 'inline-block';
			document.getElementById('signout-button').style.display = 'inline-block';
			document.getElementById('content').style.display = 'block';
			document.querySelector('.g_id_signin').style.display = 'none';
			listMessages();
		},
	});
	// Request access token
	tokenClient.requestAccessToken({prompt: 'consent'});
}

/**
 * Attach events when the web is loaded
 */
window.onload = function() {
	document.getElementById('signout-button').onclick = () => {
		google.accounts.id.disableAutoSelect();
		document.getElementById('compose-button').style.display = 'none';
		document.getElementById('refresh-button').style.display = 'none';
		document.getElementById('signout-button').style.display = 'none';
		document.getElementById('content').style.display = 'none';
		document.querySelector('.g_id_signin').style.display = 'block';
		accessToken = null;
		document.getElementById('content').innerHTML = '';
	};

	document.getElementById('refresh-button').onclick = () => {
		if(accessToken) {
			// Clear mail list
			document.getElementById('mail-table').querySelector('tbody').innerHTML = '';
			listMessages();
		}
	}

	document.getElementById('more-mail-button').onclick = () => {
		if(nextPageToken) {
			listMessages(nextPageToken);
		}
		else {
			alert("No more mail!")
		}
	}

	document.getElementById('draft-button').onclick = () => {
		if(accessToken) {
			alert("Creating, please wait!");
			createDraft();
		}
		else {
			console.log("Access token not found!")
		}
	}

	document.getElementById('send-button').onclick = () => {
		if(accessToken) {
			alert("Sending, please wait!");
			sendEmail();
		}
		else {
			console.log("Access token not found!")
		}
	}

	document.getElementById('attachmentInput').addEventListener('change',
		(event) => {
			const attachmentContainer = document.getElementById('attachmentList');
			attachmentContainer.innerHTML = '';
			const files = event.target.files;
			let sum = 0;
			for (let i = 0; i < files.length; i++) {
				sum += files[i].size / 1048576;
				if(sum > 25) {
					event.target.value = '';
					attachmentContainer.innerHTML = '';
					alert('Please choose files less than 25MB');
					return;
				}
				let newItem = document.createElement('li');
				newItem.innerHTML = files[i].name;
				attachmentContainer.appendChild(newItem);
			}
		}
	)
};
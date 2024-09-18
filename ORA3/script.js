
window.onload = () => {
    document.getElementById("pdf-download").addEventListener("click", () => {
        const options = {
            margin: 1,
            filename: 'VuSiTam_20215475.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 }, // Đặt tỷ lệ mặc định là 1
            jsPDF: { unit: 'cm', format: 'a2', orientation: 'portrait', horizontalAlign: 'center', verticalAlign: 'middle' },
        }

        html2pdf().set(options).from(document.body).save();
    });
};


function changeText(divChange) {
    let text = divChange.innerText
    let input = document.createElement("input")
    input.type = "text";
    input.value = text
    // khi roi khoi o input thi thay doi
    input.addEventListener("blur", function () {
        divChange.innerText = this.value
        if (this.value === "") divChange.innerText = "null"
        this.parentNode.removeChild(this)
    })
    input.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            this.blur(); 
        }
    });
    divChange.innerText = ""
    divChange.appendChild(input)
    input.focus();
}
function addGroup() {
    let groupItem = document.querySelector('.group-item')
    let newGroupItem = groupItem.cloneNode(true)
    var infoItems = newGroupItem.querySelectorAll('.info-item');
    // xoa cac infoItem trong group mau
    infoItems.forEach(function (infoItem) {
        if (infoItem.parentNode) {
            infoItem.parentNode.removeChild(infoItem);
        }
    });

    let idHeader = newGroupItem.querySelector('.id-header')
    idHeader.innerText = "GroupItem_20215475"

    let trashIcon = document.createElement('i');
    trashIcon.classList.add('fa', 'fa-trash-o');
    trashIcon.onclick = function () {
        let confirmed = window.confirm(`Vũ Sĩ Tâm 20215475 có muốn xóa ${idHeader.innerText} không ?`);
        if (confirmed) newGroupItem.parentNode.removeChild(newGroupItem);
    };

    idHeader.insertAdjacentElement('afterend', trashIcon);

    var container = document.querySelector('.container')
    container.appendChild(newGroupItem)
}
function addInfo(spanElement) {
    let infoItem = document.querySelector(".info-item")
    let newInfoItem = infoItem.cloneNode(true)
    newInfoItem.style.display = 'flex'

    let name = newInfoItem.querySelector('.name-item')
    name.innerText = "Item info name"

    let trash = newInfoItem.querySelector(".fa-trash-o")
    trash.onclick = () => {
        let confirmed = window.confirm(`Vũ Sĩ Tâm 20215475 có muốn xóa ${name.innerText} không ?`);
        if (confirmed) newInfoItem.parentNode.removeChild(newInfoItem)
    }
    let input = newInfoItem.querySelector("input")
    let value = newInfoItem.querySelector(".value")
    input.addEventListener("blur", () => {
        let inputValue = input.value
        value.innerText = inputValue
        if (inputValue) input.parentNode.removeChild(input)
    })
    input.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            this.blur(); 
        }
    });
    let groupItem = spanElement.closest(".group-item");
    groupItem.appendChild(newInfoItem);
}


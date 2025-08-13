function getDateDif(date1, date2) {
    return Math.floor((date1 - date2) / (100 * 60 * 60 * 24) / 10)
}
function daysAgo(dateDif) {
    dateDif = dateDif.toLocaleString()
    return dateDif == 0 ? 'Today' : dateDif + ` day${dateDif == 1 ? '' : 's'} ago`
}
function toggleVisibility(elem) {
    const element = document.getElementById(elem)
    if (element) {
        if (document.getElementById(elem).style.display == '') {
            hide(elem)
        } else {
            show(elem)
            return 1
        }
    }
}
function show(elem) {
    if (typeof (elem) == 'string') {
        elem = document.getElementById(elem)
    }
    elem.style.display = ''
}
function hide(elem) {
    if (typeof (elem) == 'string') {
        elem = document.getElementById(elem)
    }
    elem.style.display = 'none'
}
function buttonClick(pressed, unpressed, className) {
    document.querySelectorAll('#' + unpressed + ' .button').forEach(button => {
        button.classList.remove(className)
    })
    const button = document.getElementById(pressed)
    button?.classList.add(className)
}
function fontAwesome(icon) {
    return `<i class="fa fa-${icon}"></i>`
}
function setTitle(text) {
    fetch('https://myekul.github.io/shared-assets/myekul/title.html')
        .then(r => r.text())
        .then(t => document.getElementById('title').innerHTML = t)
        .then(() => {
            document.getElementById('titleText').innerHTML = text
        })
}
function setFooter(text) {
    fetch('https://myekul.github.io/shared-assets/myekul/footer.html')
        .then(r => r.text())
        .then(t => document.querySelector('footer').innerHTML = t)
        .then(() => {
            document.getElementById('footerText').innerHTML = text
        })
}
function getRowColor(index) {
    return index % 2 == 0 ? 'background2' : 'background1'
}
function myekulColor(content) {
    return `<span class='myekulColor'>${content}</span>`
}
function convertToObjects(data) {
    const headers = data[0]; // First row of the dataset is data keys
    const rows = data.slice(1);
    const objects = [];
    rows.forEach(row => {
        let rowData = {};
        headers.forEach((header, index) => {
            rowData[header] = row[index];
        });
        objects.push(rowData);
    });
    return objects;
}
// Modal
function openModal(body, title, subtitle) {
    if (title) {
        document.getElementById('modal-title').innerHTML = title
    }
    document.getElementById('modal-subtitle').innerHTML = subtitle ? subtitle : ''
    document.getElementById('modal-body').innerHTML = body
    const modal = document.getElementById("modal");
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
    modal.style.display = "block";
    const modalContent = document.getElementById('modal-content')
    modalContent.style.animation = 'modalUp 0.25s ease-out forwards';
    document.addEventListener('keydown', function (event) {
        if (event.key == 'Escape') {
            closeModal()
        }
    });
}
function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    const modalContent = document.getElementById('modal-content')
    modalContent.style.animation = 'modalDown 0.25s ease-out forwards';
    setTimeout(() => {
        hide(modal)
    }, 200);
}
window.onclick = function (event) {
    const modal = document.getElementById("modal");
    if (event.target == modal) {
        closeModal()
    }
}
fetch('https://myekul.github.io/shared-assets/modal.html')
    .then(r => r.text())
    .then(t => document.getElementById('modal').innerHTML = t)
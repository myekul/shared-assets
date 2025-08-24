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
async function setHTML(src, elem) {
    const r = await fetch(src);
    const t = await r.text();
    document.getElementById(elem).innerHTML = t;
}
async function setTitle(text) {
    await setHTML('https://myekul.github.io/shared-assets/myekul/title.html', 'title')
    document.getElementById('titleText').innerHTML = text
}
function setFooter(text) {
    fetch('https://myekul.github.io/shared-assets/myekul/footer.html')
        .then(r => r.text())
        .then(t => document.querySelector('footer').innerHTML = t)
        .then(() => {
            document.getElementById('footerText').innerHTML = text
        })
}
async function setSidebar(content) {
    await setHTML('https://myekul.github.io/shared-assets/sidebarDiv.html', 'sidebarDiv')
    document.getElementById('sidebar').innerHTML = content
}
function setResources() {
    document.querySelectorAll('#resources > div > div > a').forEach(elem => {
        elem.classList.add('button')
        elem.classList.add('container')
        elem.style.gap = '10px'
    })
    const resources = document.getElementById('resources')
    resources.classList.add('container')
    resources.style.gap = '60px'
}
function fontAwesome(icon) {
    return `<i class="fa fa-${icon}"></i>`
}
function setPageTitle(icon, text) {
    const pageTitle = document.getElementById('pageTitle')
    pageTitle.classList.add('font2')
    pageTitle.classList.add('container')
    pageTitle.style.fontSize = '200%'
    pageTitle.style.padding = '15px 0'
    pageTitle.innerText = fontAwesome(icon) + `&nbsp;&nbsp;` + text
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
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
document.addEventListener('DOMContentLoaded', function () {
    fetch('https://myekul.github.io/shared-assets/modal.html')
        .then(r => r.text())
        .then(t => {
            const modal = document.createElement('div');
            modal.id = 'modal';
            modal.innerHTML = t;
            document.body.appendChild(modal);
        })
})
function initializeHash(tab) {
    const hash = window.location.hash
    window.globalTab = hash ? hash.slice(1) : tab
}
function showTab(tab) {
    globalTab = tab
    buttonClick(globalTab + 'Button', 'tabs', 'activeBanner')
    window.history.pushState(null, null, '#' + tab);
    action()
}
async function setTabs(tabs) {
    await setHTML('https://myekul.github.io/shared-assets/tabsDiv.html', 'tabsDiv')
    let HTMLContent = ''
    tabs.forEach(pageName => {
        if (pageName) {
            HTMLContent += `<div id='${pageName}Button' class='button' onclick="showTab('${pageName}')">${fontAwesome(fontAwesomeSet[pageName][1])}</div>`
        } else {
            HTMLContent += `<div class='dot'></div>`
        }
    })
    document.getElementById('tabs').innerHTML = HTMLContent
}
function loadClient(now) {
    gapi.client.setApiKey('AIzaSyBFOYjIw9IrbPirN1ov4zkVBTFOOCX1l8w');
    gapi.client.load('https://sheets.googleapis.com/$discovery/rest?version=v4')
        .then(() => {
            console.log("GAPI client loaded for API");
            if (now) {
                fetchData()
            }
        })
        .catch(error => {
            console.error("Error loading GAPI client: ", error);
        });
}
async function fetchData() {
    try {
        const response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: range,
        });
        processData(response.result.values)
    } catch (err) {
        console.error(err);
        throw err;
    }
}
function boardTitleWrapper(content) {
    if (content) return `<div><table class='boardTitleTable'><tr>${content}</tr></table></div>`
    return ''
}
function boardTitleCell(className, content) {
    return `<td class='${className}' style='height:32px;padding:0 5px'>${content}</td>`
}
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar')
    if (sidebar.style.display == '') {
        sidebar.classList.add('hidden')
        setTimeout(() => {
            hide(sidebar)
        }, 200);
    } else {
        sidebar.classList.remove('hidden')
        show(sidebar)
    }
}
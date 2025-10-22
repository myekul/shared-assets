const fontAwesomeSet = {
    home: ['Home', 'home'],
    ballpit: ['Ballpit', 'smile-o'],
    random: ['Random', 'question'],
    // Combined Leaderboard
    featured: ['Featured', 'star'],
    leaderboards: ['Leaderboards', 'cubes'],
    WRs: ['World Records', 'trophy'],
    map: ['Map', 'flag'],
    sort: ['Sort', 'sort-amount-asc'],
    // Run Recap
    altStrats: ['Comm Best ILs', 'database'],
    commBestILs: ['Run Viable Golds', 'trophy'],
    commBestSplits: ['Comm Best Splits', 'tasks'],
    sums: ['Sums', 'plus'],
    residual: ['Residual', 'star'],
    grid: ['Grid', 'group'],
    // Speedrun Resources
    bossInfo: ['Boss Info', 'drivers-license-o'],
    hp: ['HP', 'heart'],
    shotInfo: ['Shot Info', 'crosshairs'],
    tutorials: ['Tutorials', 'book'],
    monkeyTool: ['Monkey Tool', 'wrench'],
    graveyardTool: ['Graveyard Tool', 'wrench'],
    rumorTool: ['Rumor Tool', 'wrench'],
    // myekuldex
    pokedex: ['Pokedex', 'book'],
    sfx: ['SFX', 'volume-up'],
    // Pikmin Place
    sublevels: ['Sublevels', 'bars'],
    // Star Haven
    courses: ['Courses', 'star'],
    // Roster Realm
    list: ['List', 'book'],
    // Media Anthology
    artist: ['Artist', 'users'],
    stats: ['Stats', 'pie-chart'],
    era: ['Era', 'calendar'],
    durations: ['Durations', 'clock-o'],
    nationality: ['Nationality', 'flag'],
    media: ['Media', 'newspaper-o'],
}
const grades = [
    { grade: 'A+', className: 'grade-a-plus', threshold: 97 },
    { grade: 'A', className: 'grade-a', threshold: 93 },
    { grade: 'A-', className: 'grade-a-minus', threshold: 90 },
    { grade: 'B+', className: 'grade-b-plus', threshold: 87 },
    { grade: 'B', className: 'grade-b', threshold: 83 },
    { grade: 'B-', className: 'grade-b-minus', threshold: 80 },
    { grade: 'C+', className: 'grade-c-plus', threshold: 77 },
    { grade: 'C', className: 'grade-c', threshold: 73 },
    { grade: 'C-', className: 'grade-c-minus', threshold: 70 },
    { grade: 'D+', className: 'grade-d-plus', threshold: 67 },
    { grade: 'D', className: 'grade-d', threshold: 63 },
    { grade: 'D-', className: 'grade-d-minus', threshold: 60 },
    { grade: 'F', className: 'grade-f', threshold: 0 }
]
grades.forEach(grade => {
    grade.className += ' grade'
})
function getLetterGrade(percentage) {
    for (let grade of grades) {
        if (percentage >= grade.threshold) return grade;
    }
    return grades[grades.length - 1]
}
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
            fetch(`https://api.github.com/repos/myekul/${window.location.pathname.split('/')[1]}/commits?path=index.html&page=1&per_page=1`)
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        const lastCommitDate = new Date(data[0].commit.committer.date);
                        const formattedDate = lastCommitDate.toISOString().split('T')[0];
                        document.getElementById('lastUpdated').textContent = `last updated ${formattedDate}`;
                    }
                })
                .catch(err => console.error(err));
        })
    if (document.querySelector('title').innerText != 'myekul') setDiscord()
}
async function setSidebar(content) {
    addStylesheet('https://myekul.github.io/shared-assets/elements/sidebar/sidebar.css')
    await setHTML('https://myekul.github.io/shared-assets/elements/sidebar/sidebar.html', 'sidebarDiv')
    document.getElementById('sidebar').innerHTML = content
}
function setResources() {
    document.querySelectorAll('#resources > div > div > a').forEach(elem => {
        elem.classList.add('button')
        elem.style.gap = '10px'
    })
    const resources = document.getElementById('resources')
    resources.classList.add('container')
    resources.style.gap = '60px'
}
function fontAwesome(icon) {
    return `<i class="fa fa-${icon}"></i>`
}
function fontAwesomeText(icon, text) {
    return `<div class='font2 container' style='gap:12px;font-size:200%;padding:15px 0'>${fontAwesome(icon)}${text}</div>`
}
function setPageTitle(icon, text) {
    document.getElementById('pageTitle').innerHTML = fontAwesomeText(icon, text)
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
function getColorFromClass(className, textColor) {
    const field = textColor ? 'color' : 'backgroundColor'
    const tempEl = document.createElement('div');
    tempEl.className = className;
    document.body.appendChild(tempEl);
    const color = getComputedStyle(tempEl)[field];
    document.body.removeChild(tempEl);
    return color;
}
// Sounds
function setAudio(source, audioNames) {
    if (source == 'cuphead') {
        audioNames = ['cardup', 'carddown', 'cardflip', 'category_select', 'equip_move', 'locked', 'move', 'ready', 'win_time_loop', 'win_time_loop_end']
    }
    audioNames.forEach(audio => {
        const audioElement = document.createElement('audio');
        audioElement.id = audio;
        const src = source == 'cuphead' ? `https://myekul.github.io/shared-assets/cuphead/sfx/` : 'sfx/' + source + '/'
        audioElement.src = src + audio + '.wav';
        document.body.appendChild(audioElement);
    });
    document.querySelectorAll('input').forEach(elem => {
        elem.addEventListener('click', () => {
            playSound('move')
        })
    })
    document.querySelectorAll('.button').forEach(elem => {
        elem.addEventListener('click', () => {
            playSound('category_select')
        })
    })
}
function playSound(sfx) {
    const sound = document.getElementById(sfx)
    if (sound) {
        sound.currentTime = 0
        sound.volume = 0.2
        sound.play()
    }
}
function stopSound(sfx) {
    const sound = document.getElementById(sfx)
    if (sound) {
        sound.pause()
        sound.currentTime = 0
    }
}
document.addEventListener('DOMContentLoaded', function () {
    addStylesheet('https://myekul.github.io/shared-assets/elements/modal/modal.css')
    fetch('https://myekul.github.io/shared-assets/elements/modal/modal.html')
        .then(r => r.text())
        .then(t => {
            addJSFile('https://myekul.github.io/shared-assets/elements/modal/modal.js', () => {
                const modal = document.createElement('div');
                modal.id = 'modal';
                modal.innerHTML = t;
                document.body.appendChild(modal);
            })
        })
})
function addStylesheet(href) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
}
function addJSFile(path, callback) {
    const script = document.createElement('script');
    script.src = path;
    script.type = 'text/javascript';
    script.onload = callback;
    document.head.appendChild(script);
}
function initializeHash(tab) {
    let hash = window.location.hash
    if (hash) {
        hash = hash.slice(1)
        if (!fontAwesomeSet[hash]) hash = null
    }
    window.globalTab = hash ? hash : tab
}
function showTab(tab) {
    globalTab = tab
    buttonClick(globalTab + 'Button', 'tabs', 'activeBanner')
    window.history.pushState(null, null, '#' + tab);
    action()
}
async function setTabs(tabs) {
    await setHTML('https://myekul.github.io/shared-assets/html/tabs.html', 'tabsDiv')
    let HTMLContent = ''
    tabs.forEach(elem => {
        if (elem) {
            if (Array.isArray(elem)) {
                elem.forEach(elem2 => {
                    HTMLContent += elem2
                })
            } else {
                let tabContent = ''
                if (fontAwesomeSet[elem]) tabContent = fontAwesome(fontAwesomeSet[elem][1])
                HTMLContent += `<div id='${elem}Button' class='button' onclick="playSound('category_select');showTab('${elem}')">${tabContent}</div>`
            }
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
        playSound('carddown')
        sidebar.classList.add('hidden')
        setTimeout(() => {
            hide(sidebar)
        }, 200);
    } else {
        playSound('cardup')
        sidebar.classList.remove('hidden')
        show(sidebar)
    }
}
function sharedAssetsImg(src) {
    return `<img src='${sharedAssetsURL(src)}'>`
}
function sharedAssetsURL(src) {
    return `https://myekul.github.io/shared-assets/images/${src}.png`
}
function setDiscord() {
    fetch('https://discord.com/api/guilds/1386406855391313960/widget.json')
        .then(response => response.json())
        .then(data => {
            addJSFile('https://myekul.github.io/shared-assets/elements/discord.js', () => {
                window.discordData = data
                discordOnline(data.presence_count)
            })
        })
}
let ballpitLoaded = false
function setBallpit(content, elemSize = 100, floorOffset = -40) {
    if (ballpitLoaded) {
        ballpitPrepare(content, elemSize, floorOffset)
    } else {
        addJSFile('https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js', () => {
            addJSFile('https://myekul.github.io/shared-assets/elements/ballpit/ballpit.js', () => {
                ballpitPrepare(content, elemSize, floorOffset)
            })
        })
    }
}
function getAnchor(url) {
    return url ? `<a href="${url}" target='_blank'>` : ''
}
function getParam(paramName) {
    return new URLSearchParams(window.location.search).get(paramName)
}
function setParam(paramName, param) {
    const url = new URL(window.location.href);
    url.searchParams.set(paramName, param);
    window.history.pushState({}, '', url);
}
function deleteParam(paramName) {
    const url = new URL(window.location.href);
    url.searchParams.delete(paramName);
    window.history.pushState({}, '', url);
}
function getDelta(delta) {
    const negative = delta <= 0
    delta = Math.abs(delta)
    return (negative ? '-' : '+') + (delta >= 60 ? secondsToHMS(delta) : delta + 's')
}
function redGreen(delta) {
    return 'delta-' + (delta > 0 ? 'red' : 'green')
}
function getScore(category, runTime) {
    const wrTime = getWorldRecord(category)
    const percentage = wrTime / runTime
    return percentage * 100
}
function getWorldRecord(category) {
    return category.runs[0]?.score
}
function displayPercentage(percentage) {
    if (percentage) {
        percentage = percentage.toFixed(2).toString()
        let percentageDecimals = '00'
        if (percentage.split('.').length > 1) {
            percentageDecimals = percentage.split('.')[1]
            if (percentageDecimals.length == 1) {
                percentageDecimals += 0
            }
        }
        return percentage.split('.')[0] + `<span style='font-size:70%;justify-self:flex-end'>.${percentageDecimals}</span>`
    }
    return ''
}
const placeClass = {
    1: 'first',
    2: 'second',
    3: 'third'
}
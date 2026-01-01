setCuphead()
async function setCuphead() {
    const r = await fetch('https://myekul.com/shared-assets/cuphead/projects.html');
    const t = await r.text();
    document.querySelector('header').insertAdjacentHTML("afterbegin", t)
    document.querySelectorAll('#cupheadProjects a').forEach(elem => {
        elem.classList.add('container')
    })
}
const nullTime = 3.4028234663852886e+38
const isles = [
    { id: 'isle1', name: 'Isle 1', className: 'isle1', numBosses: 5, mapID: 3 },
    { id: 'isle2', name: 'Isle 2', className: 'expert', numBosses: 5, mapID: 4 },
    { id: 'isle3', name: 'Isle 3', className: 'isle3', numBosses: 7, mapID: 5 },
    { id: 'hell', name: 'Hell', className: 'hell', numBosses: 2, mapID: 6 },
    { id: 'isle4', name: 'Isle 4', className: 'dlc', numBosses: 6, mapID: 68 }
]
function cupheadShot(shot, size, extra) {
    if (shot) {
        return `<img src="https://myekul.com/shared-assets/cuphead/images/inventory/weapon/${shot}.png" ${extra ? `class='container'` : ''} ${size ? `style='height:${size}px'` : ''}>`
    }
    return ''
}
function downloadJSON(object, name = 'cuphead_player_data_v1_slot_0.sav') {
    const jsonStr = JSON.stringify(object, null, 2)
    const blob = new Blob([jsonStr], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url;
    a.download = name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
}
function fancyTab(tab) {
    return `<div id='${tab}Button' onclick="playSound('category_select');showTab('${tab}')" class="font2 button"
        style="width:75px;font-size:120%;gap:2px;background-color:var(--cuphead)">
        <img src="https://myekul.com/shared-assets/cuphead/images/extra/${tab}.png" style="height:21px">.${tab}
    </div>`
}
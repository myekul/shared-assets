setCuphead()
async function setCuphead() {
    const r = await fetch('https://myekul.com/shared-assets/cuphead/projects.html');
    const t = await r.text();
    document.querySelector('header').insertAdjacentHTML("afterbegin", t)
    document.querySelectorAll('#cupheadProjects a').forEach(elem => {
        elem.classList.add('container')
    })
}
const mausoleumID = 1481199742
const nullTime = 3.4028234663852886e+38
const isles = [
    { id: 'isle1', name: 'Isle 1', className: 'isle1', numBosses: 5, mapID: 3 },
    { id: 'isle2', name: 'Isle 2', className: 'expert', numBosses: 5, mapID: 4 },
    { id: 'isle3', name: 'Isle 3', className: 'isle3', numBosses: 7, mapID: 5 },
    { id: 'hell', name: 'Hell', className: 'hell', numBosses: 2, mapID: 6 },
    { id: 'isle4', name: 'Isle 4', className: 'dlc', numBosses: 6, mapID: 68 }
]
bosses.forEach(boss => {
    if (boss.id == 'kingdice') {
        boss.time = 259
    } else if (['thedevil', 'chefsaltbaaker'].includes(boss.id)) {
        boss.time = 194
    } else {
        boss.time = 129
    }
    if (['hildaberg', 'wallywarbles', 'djimmithegreat', "drhaklsrobot", 'calamaria', 'estherwinchester'].includes(boss.id)) {
        boss.plane = true
    } else {
        boss.plane = false
    }
})
function cupheadShot(shot, size, extra) {
    if (shot) {
        return `<img src="https://myekul.com/shared-assets/cuphead/images/inventory/weapon/${shot}.png" ${extra ? `class='container'` : ''} ${size ? `style='height:${size}px'` : ''}>`
    }
    return ''
}
setCuphead()
async function setCuphead() {
    const r = await fetch('https://myekul.github.io/shared-assets/cuphead/projects.html');
    const t = await r.text();
    document.querySelector('header').insertAdjacentHTML("afterbegin", t)
    document.querySelectorAll('#cupheadProjects a').forEach(elem => {
        elem.classList.add('container')
    })
}
const bosses = [
    {
        id: 'therootpack',
        name: 'The Root Pack',
        isle: 1,
        order: 7
    },
    {
        id: 'goopylegrande',
        name: 'Goopy Le Grande',
        isle: 1,
        order: 9
    },
    {
        id: 'hildaberg',
        name: 'Hilda Berg',
        isle: 1,
        order: 10
    },
    {
        id: 'cagneycarnation',
        name: 'Cagney Carnation',
        isle: 1,
        order: 11
    },
    {
        id: 'ribbyandcroaks',
        name: 'Ribby and Croaks',
        isle: 1,
        order: 8
    },
    {
        id: 'baronessvonbonbon',
        name: 'Baroness Von Bon Bon',
        isle: 2,
        order: 12
    },
    {
        id: 'beppitheclown',
        name: 'Beppi The Clown',
        isle: 2,
        order: 15
    },
    {
        id: 'djimmithegreat',
        name: 'Djimmi The Great',
        isle: 2,
        order: 14
    },
    {
        id: 'grimmatchstick',
        name: 'Grim Matchstick',
        isle: 2,
        order: 16
    },
    {
        id: 'wallywarbles',
        name: 'Wally Warbles',
        isle: 2,
        order: 13
    },
    {
        id: 'rumorhoneybottoms',
        name: 'Rumor Honeybottoms',
        isle: 3,
        order: 17
    },
    {
        id: 'captainbrineybeard',
        name: 'Captain Brineybeard',
        isle: 3,
        order: 21
    },
    {
        id: 'sallystageplay',
        name: 'Sally Stageplay',
        isle: 3,
        order: 19
    },
    {
        id: 'wernerwerman',
        name: 'Werner Werman',
        isle: 3,
        order: 20
    },
    {
        id: 'drkahlsrobot',
        name: "Dr. Kahl's Robot",
        isle: 3,
        order: 18
    },
    {
        id: 'calamaria',
        name: 'Cala Maria',
        isle: 3,
        order: 22
    },
    {
        id: 'phantomexpress',
        name: 'Phantom Express',
        isle: 3,
        order: 23
    },
    {
        id: 'kingdice',
        name: 'King Dice',
        isle: 4,
        order: 24
    },
    {
        id: 'thedevil',
        name: 'The Devil',
        isle: 4,
        order: 25
    },
    {
        id: 'glumstonethegiant',
        name: 'Glumstone The Giant',
        isle: 5,
        order: 1
    },
    {
        id: 'moonshinemob',
        name: 'Moonshine Mob',
        isle: 5,
        order: 5
    },
    {
        id: 'thehowlingaces',
        name: 'The Howling Aces',
        isle: 5,
        order: 3
    },
    {
        id: 'mortimerfreeze',
        name: 'Mortimer Freeze',
        isle: 5,
        order: 2
    },
    {
        id: 'estherwinchester',
        name: 'Esther Winchester',
        isle: 5,
        order: 4
    },
    {
        id: 'chefsaltbaker',
        name: 'Chef Saltbaker',
        isle: 5,
        order: 6
    }
];
const bossIDs = {
    therootpack: 6,
    goopylegrande: 1450863107,
    hildaberg: 1449745424,
    cagneycarnation: 1450266910,
    ribbyandcroaks: 7,
    baronessvonbonbon: 1451300935,
    beppitheclown: 1456125457,
    djimmithegreat: 1460200177,
    grimmatchstick: 1432722919,
    wallywarbles: 1428495827,
    rumorhoneybottoms: 1429976377,
    captainbrineybeard: 2,
    sallystageplay: 1456740288,
    wernerwerman: 1430652919,
    drkahlsrobot: 1452935394,
    calamaria: 1446558823,
    phantomexpress: 5,
    kingdice: 1465296077,
    thedevil: 1466688317,
    glumstonethegiant: 1523429320,
    moonshinemob: 1518081307,
    thehowlingaces: 1511943573,
    mortimerfreeze: 1527591209,
    estherwinchester: 1530096313,
    chefsaltbaker: 1573044456
};
const mausoleumID = 1481199742
const runNgunIDs = {
    forestfollies: 1464969490,
    treetoptrouble: 1464969491,
    funhousefrazzle: 1496818712,
    funfairfever: 1499704951,
    perilouspiers: 1464969492,
    ruggedridge: 1464969493
}
const isles = [
    { id: 'isle1', name: 'Isle 1', className: 'isle1', numBosses: 5 },
    { id: 'isle2', name: 'Isle 2', className: 'expert', numBosses: 5 },
    { id: 'isle3', name: 'Isle 3', className: 'isle3', numBosses: 7 },
    { id: 'hell', name: 'Hell', className: 'hell', numBosses: 2 },
    { id: 'isle4', name: 'Isle 4', className: 'dlc', numBosses: 6 }
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
        return `<img src="https://myekul.github.io/shared-assets/cuphead/images/inventory/weapon/${shot}.png" ${extra ? `class='container'` : ''} ${size ? `style='height:${size}px'` : ''}>`
    }
    return ''
}
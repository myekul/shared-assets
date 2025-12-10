const bosses = [
    {
        id: 'therootpack',
        name: 'The Root Pack',
        internal: 'veggies',
        isle: 1,
        order: 7,
        levelID: 6
    },
    {
        id: 'goopylegrande',
        name: 'Goopy Le Grande',
        internal: 'slime',
        isle: 1,
        order: 9,
        levelID: 1450863107
    },
    {
        id: 'hildaberg',
        name: 'Hilda Berg',
        internal: 'flying_blimp',
        isle: 1,
        order: 10,
        levelID: 1449745424
    },
    {
        id: 'cagneycarnation',
        name: 'Cagney Carnation',
        internal: 'flower',
        isle: 1,
        order: 11,
        levelID: 1450266910
    },
    {
        id: 'ribbyandcroaks',
        name: 'Ribby and Croaks',
        internal: 'frogs',
        isle: 1,
        order: 8,
        levelID: 7
    },
    {
        id: 'baronessvonbonbon',
        name: 'Baroness Von Bon Bon',
        internal: 'baroness',
        isle: 2,
        order: 12,
        levelID: 1451300935
    },
    {
        id: 'beppitheclown',
        name: 'Beppi The Clown',
        internal: 'clown',
        isle: 2,
        order: 15,
        levelID: 1456125457
    },
    {
        id: 'djimmithegreat',
        name: 'Djimmi The Great',
        internal: 'flying_genie',
        isle: 2,
        order: 14,
        levelID: 1460200177
    },
    {
        id: 'grimmatchstick',
        name: 'Grim Matchstick',
        internal: 'dragon',
        isle: 2,
        order: 16,
        levelID: 1432722919
    },
    {
        id: 'wallywarbles',
        name: 'Wally Warbles',
        internal: 'flying_bird',
        isle: 2,
        order: 13,
        levelID: 1428495827
    },
    {
        id: 'rumorhoneybottoms',
        name: 'Rumor Honeybottoms',
        internal: 'bee',
        isle: 3,
        order: 17,
        levelID: 1429976377
    },
    {
        id: 'captainbrineybeard',
        name: 'Captain Brineybeard',
        internal: 'pirate',
        isle: 3,
        order: 21,
        levelID: 2
    },
    {
        id: 'sallystageplay',
        name: 'Sally Stageplay',
        internal: 'sally_stage_play',
        isle: 3,
        order: 19,
        levelID: 1456740288
    },
    {
        id: 'wernerwerman',
        name: 'Werner Werman',
        internal: 'mouse',
        isle: 3,
        order: 20,
        levelID: 1430652919
    },
    {
        id: 'drkahlsrobot',
        name: "Dr. Kahl's Robot",
        internal: 'robot',
        isle: 3,
        order: 18,
        levelID: 1452935394
    },
    {
        id: 'calamaria',
        name: 'Cala Maria',
        internal: 'flying_mermaid',
        isle: 3,
        order: 22,
        levelID: 1446558823
    },
    {
        id: 'phantomexpress',
        name: 'Phantom Express',
        internal: 'train',
        isle: 3,
        order: 23,
        levelID: 5
    },
    {
        id: 'kingdice',
        name: 'King Dice',
        internal: 'dice_palace_main',
        isle: 4,
        order: 24,
        levelID: 1465296077
    },
    {
        id: 'thedevil',
        name: 'The Devil',
        internal: 'devil',
        isle: 4,
        order: 25,
        levelID: 1466688317
    },
    {
        id: 'glumstonethegiant',
        name: 'Glumstone The Giant',
        internal: 'old_man',
        isle: 5,
        order: 1,
        levelID: 1523429320
    },
    {
        id: 'moonshinemob',
        name: 'Moonshine Mob',
        internal: 'rum_runners',
        isle: 5,
        order: 5,
        levelID: 1518081307
    },
    {
        id: 'thehowlingaces',
        name: 'The Howling Aces',
        internal: 'airplane',
        isle: 5,
        order: 3,
        levelID: 1511943573
    },
    {
        id: 'mortimerfreeze',
        name: 'Mortimer Freeze',
        internal: 'snow_cult',
        isle: 5,
        order: 2,
        levelID: 1527591209
    },
    {
        id: 'estherwinchester',
        name: 'Esther Winchester',
        internal: 'flying_cowboy',
        isle: 5,
        order: 4,
        levelID: 1530096313
    },
    {
        id: 'chefsaltbaker',
        name: 'Chef Saltbaker',
        internal: 'saltbaker',
        isle: 5,
        order: 6,
        levelID: 1573044456
    }
]
bosses.forEach(boss => {
    if (boss.id == 'kingdice') {
        boss.time = 259
    } else if (['thedevil', 'chefsaltbaker'].includes(boss.id)) {
        boss.time = 194
    } else {
        boss.time = 129
    }
    if (['hildaberg', 'wallywarbles', 'djimmithegreat', "drkahlsrobot", 'calamaria', 'estherwinchester'].includes(boss.id)) {
        boss.plane = true
    } else {
        boss.plane = false
    }
})
const runNguns = [
    {
        id: 'forestfollies',
        name: 'Forest Follies',
        internal: 'platforming_1_1F',
        isle: 1,
        levelID: 1464969490
    },
    {
        id: 'treetoptrouble',
        name: 'Treetop Trouble',
        internal: 'platforming_1_2F',
        isle: 1,
        levelID: 1464969491
    },
    {
        id: 'funhousefrazzle',
        name: 'Funhouse Frazzle',
        internal: 'platforming_2_1F',
        isle: 2,
        levelID: 1496818712
    },
    {
        id: 'funhousefrazzle',
        name: 'Funfair Fever',
        internal: 'platforming_2_2F',
        isle: 2,
        levelID: 1499704951
    },
    {
        id: 'perilouspiers',
        name: 'Perilous Piers',
        internal: 'platforming_3_1F',
        isle: 3,
        levelID: 1464969492
    },
    {
        id: 'ruggedridge',
        name: 'Rugged Ridge',
        internal: 'platforming_3_2F',
        isle: 3,
        levelID: 1464969493
    }
]
const cupheadLevels = {};

[...bosses, ...runNguns].forEach(level => {
    cupheadLevels['level_' + level.internal] = level;
});

const cupheadCutscenes = {
    intro: 'Intro',
    world2: 'Isle 2',
    world3: 'Isle 3',
    kingdice: 'King Dice',
    devil: 'The Devil',
    dlc_intro: 'DLC Intro',
    dlc_saltbaker_prebattle: 'Saltbaker Prebattle',
    dlc_ending: 'DLC Ending',
}

const cupheadIntermissions = {
    level_house_elder_kettle: "Elder Kettle's House",
    level_tutorial: 'Tutorial',
    shop: 'Shop',
    level_mausoleum: 'Mausoleum',
}

const mausoleumID = 1481199742
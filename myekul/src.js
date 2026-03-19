function getFlag(countryCode, countryName, size) {
    let HTMLContent = `<img src="https://www.speedrun.com/images/flags/${countryCode}.png" style="height:${size}px" title="${countryName}" alt=''></img>`
    return HTMLContent
}
function getPlayerName(player) {
    let playerName = player?.name ? player.name : player
    if (playerName.charAt(0) == '[') {
        const match = playerName.match(/\(([^)]+)\)/)
        playerName = match ? match[1] : playerName.slice(4)
    }
    let HTMLContent = playerName
    if (player['name-style']) HTMLContent = `<span style='background: linear-gradient(90deg, ${player['name-style'].color1}, ${player['name-style'].color2});-webkit-background-clip: text;color: transparent;'>${player.name}</span>`
    return HTMLContent
}
function getPlayerFlag(player, size) {
    const playerLocation = player.location
    if (playerLocation) {
        let countryCode = playerLocation.country.code
        let countryName = playerLocation.country.name
        return getFlag(countryCode, countryName, size)
    }
    return ''
}
function getPlayerIcon(player, size) {
    const imgsrc = player?.links?.img ? player.links.img : ''
    const src = imgsrc ? 'https://www.speedrun.com/static/user/' + player.id + '/image?v=' + imgsrc : 'images/null.png'
    return `<div style='width:${size}px;height:${size}px'><img src='${src}' style='width:100%;height:100%;border-radius: 50%;object-fit: cover;object-position:center' title='${player?.name}'></img></div>`
}
function playerDisplay(playerString = localStorage.getItem('username'), exception) {
    const player =
        players.find(p => p.name === playerString) ||
        (typeof allPlayers != 'undefined' ? allPlayers?.find(p => p.name === playerString) : null)
    const playerName = player ? getPlayerName(player) : playerString
    let HTMLContent = `<div class='container' style='gap:6px;margin:0 3px'>`
    HTMLContent += player && !exception ? `<div style='width:20px'>${getPlayerFlag(player, 13)}</div>` : ''
    HTMLContent += player ? `<div>${getPlayerIcon(player, 27)}</div>` : ''
    HTMLContent += `<div style='font-size:100%'>${playerName}</div>`
    HTMLContent += `</div>`
    return HTMLContent
}
function cleanRuns(runs) {
    const newRuns = []
    runs.forEach(run => {
        const theRun = run.run
        let playerContent = { rel: theRun.players[0].rel, id: theRun.players[0].id }
        if (theRun.players[0].name) playerContent = { name: theRun.players[0].name }
        let url = null
        if (theRun.videos) {
            if (theRun.videos.links) {
                url = theRun.videos.links[theRun.videos.links.length - 1].uri
            } else {
                url = theRun.videos.text
            }
        }
        const newRun =
        {
            date: theRun.date,
            place: run.place,
            player: playerContent,
            score: theRun.times.primary_t,
            videos: theRun.videos,
            id: theRun.weblink.split('run/')[1],
            url: url,
            comment: theRun.comment
        }
        newRuns.push(newRun)
    })
    return newRuns
}
function cleanPlayers(thePlayers) {
    const newPlayers = []
    thePlayers.forEach(player => {
        if (!player.name) player.name = player.names.international
        const img = player.assets?.image.uri ? player.assets.image.uri.split('=')[1] : null
        let color1 = '#fff', color2 = '#fff'
        if (player['name-style']) {
            if (player['name-style'].color) {
                color1 = player['name-style'].color.dark
                color2 = color1
            } else {
                color1 = player['name-style']['color-from'].dark
                color2 = player['name-style']['color-to'].dark
            }
        }
        const location = player.location
        if (location) {
            location.country.name = location.country.names.international
            delete location.country.names
            if (location.region) {
                location.region.name = location.region.names.international
                delete location.region.names
            }
        }
        const cleanPlayer =
        {
            id: player.id,
            name: player.name,
            'name-style': { color1: color1, color2: color2 },
            links: { src: player.weblink ? true : false, img: img },
            location: location,
            signup: player.signup ? player.signup.slice(0, 10) : null
        }
        if (!cleanPlayer.id) delete cleanPlayer.id
        if (!location) delete cleanPlayer.location
        if (!cleanPlayer.signup) delete cleanPlayer.signup
        if (!cleanPlayer.links.img) delete cleanPlayer.links.img
        if (player.twitch) cleanPlayer.links.twitch = player.twitch.uri.split('twitch.tv/')[1]
        if (player.youtube) cleanPlayer.links.youtube = player.youtube.uri
        newPlayers.push(cleanPlayer)
    })
    return newPlayers
}
function scoreGradeSpan(percentage) {
    const grade = getLetterGrade(percentage)
    return `<div class='${grade.className}' style='display:inline-block;border-radius:5px;padding:0 5px'><span>${displayPercentage(percentage)}% ${grade.grade}</span></div>`
}
function podium(everyRun) {
    let HTMLContent = ''
    HTMLContent += `<div style='padding-left:20px'>
        <div id='podium' class='container'>
            <div class='second' style='height:50%'><div class='container'>${getPlayerIcon(players[1], 70)}</div></div>
            <div class='first' style='height:70%'><div class='container'>${getPlayerIcon(players[0], 70)}</div></div>
            <div class='third' style='height:30%'><div class='container'>${getPlayerIcon(players[2], 70)}</div></div>
        </div>`
    HTMLContent += `<div class='container' style='gap:10px;padding:15px 0'>`
    players.slice(3, 10).forEach(player => {
        HTMLContent += `<div>${getPlayerIcon(player, 50)}</div>`
    })
    HTMLContent += `</div>`
    HTMLContent += fancyTable(everyRun, 10)
    HTMLContent += `</div>`
    return HTMLContent
}
function fancyThumbnail(run, size) {
    return `<td>${getThumbnail(run.url, size)}</td>`
}
function fancyDate(run) {
    const date = run.date
    const dateDif = daysAgo(getDateDif(new Date(), new Date(date)))
    return `<td style='padding:0 8px'>
        <div style='font-size:90%'>${date}</div>
        <div style='font-size:70%'>${dateDif}</div>
        </td>`
}
function fancyTime(run, categoryIndex, extra) {
    const category = categories[categoryIndex]
    let HTMLContent = ''
    HTMLContent += `<td style='padding:0 5px'>`
    HTMLContent += sortCategoryIndex == -1 && mode == 'fullgame' ? `<div style='font-size:80%;padding-bottom:4px'>${categorySpan(category)}</div>` : ''
    const trophy = getTrophy(run.place)
    HTMLContent += `<div class='container' ${trophy ? `style='gap:5px'` : ''}>
    <div>${trophy}</div>
    <div class='${category?.className}' style='font-size:140%;border-radius:5px;padding:0 4px'>${secondsToHMS(run.score)}</div>
    </div>`
    HTMLContent += !extra ? `<div style='font-size:80%;padding-top:4px'>${scoreGradeSpan(run.percentage)}</div>` : ''
    HTMLContent += `</td>`
    return HTMLContent
}
function fancyPlayer(playerIndex) {
    const player = players[playerIndex]
    let HTMLContent = ''
    HTMLContent += `<td style='padding-left:8px'>${getPlayerFlag(player, 20)}</td>`
    HTMLContent += `<td style='padding:0 5px'>${getPlayerIcon(player, 48)}</td>`
    HTMLContent += `<td ${sortCategoryIndex == -1 ? `class='clickable' onclick="openModalCL(false,'${player.name}')"` : ''} style='font-size:120%;text-align:left;padding-right:8px'>${getPlayerName(player)}</td>`
    return HTMLContent
}
function fancyTable(runs, numRuns = 5) {
    let HTMLContent = `<table class='bigShadow' style='border-collapse:collapse;border:4px solid var(--background1)'>`
    runs.slice(0, numRuns).forEach((run, runIndex) => {
        HTMLContent += `<tr class='${getRowColor(runIndex)}'>`
        HTMLContent += fancyRun(run.run, run.categoryIndex)
        HTMLContent += fancyPlayer(run.playerIndex)
        HTMLContent += `</tr>`
    })
    HTMLContent += `</table>`
    return HTMLContent
}
function normalize(percentage, value = 50) {
    if (percentage < value) {
        return 0
    }
    return ((percentage - value) / (100 - value)) * 100
}
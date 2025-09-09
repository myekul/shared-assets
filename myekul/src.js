function getFlag(countryCode, countryName, size) {
    let HTMLContent = `<img src="https://www.speedrun.com/images/flags/${countryCode}.png" style="height:${size}px" title="${countryName}" alt=''></img>`
    return HTMLContent
}
function getPlayerName(player) {
    let playerName = player.name ? player.name : player
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
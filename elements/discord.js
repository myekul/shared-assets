function discordOnline(num) {
    const HTMLContent = `
        <div class='container grow' style='gap:5px;margin:0' onclick="openModal(discord(), 'DISCORD')">
            <img src="${sharedAssetsURL('discord')}" class="brightPulse" style="padding-left:10px;height:24px">
            <div style='width:8px;height:8px;background-color:limegreen;border-radius:50%'></div>
            ${num}
        </div>`
    document.getElementById("headerRow")
        .insertAdjacentHTML("beforeend", HTMLContent);
}
function discord() {
    let HTMLContent = ''
    HTMLContent += `<div class='textBlock' style='max-width:500px;font-size:90%'>Join our vibrant community in ${myekulColor('myekul castle')}! Stay up-to-date with all the latest features and behind-the-scenes glimpses of ${myekulColor('the myekul project')}.</div>`
    HTMLContent += `
            <div class='container' style='padding:16px 0;gap:8px'>
            <img src='${sharedAssetsURL('discord')}' style='height:24px'></img>
                ${getAnchor(discordData.instant_invite)}<div class='button banner'>Join Server!</div></a>
                <div style='width:8px;height:8px;background-color:limegreen;border-radius:50%'></div>
                ${discordData.presence_count}
            </div>`
    HTMLContent += `<div class='container'><table>`
    discordData.members.forEach(member => {
        // if (member.username == 'm...') {
        //     member.username = 'myekul'
        // }
        let srcMember
        if (players) srcMember = players.find(player => player.name == member.username)
        HTMLContent += `<tr>`
        HTMLContent += `<td><img src='${member.avatar_url}' style='height:30px;border-radius:15px'></td>`
        HTMLContent += `<td style='text-align:left;padding-left:5px'>${srcMember ? getPlayerName(srcMember) : member.username}</td>`
        HTMLContent += member.game ? `<td style='padding-left:10px;color:var(--gray);text-align:left'>${member.game.name}</td>` : ''
        HTMLContent += `</tr>`
    })
    HTMLContent += `</table></div>`
    return HTMLContent
}
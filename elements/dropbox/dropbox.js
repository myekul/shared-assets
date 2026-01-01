async function initializeDropbox(sav) {
    await setHTML('https://myekul.com/shared-assets/elements/dropbox/dropbox.html', 'dropbox')
    const dropbox = document.getElementById('dropbox');
    const dropboxClass = 'dropboxHover'
    dropbox.addEventListener('dragover', (event) => {
        event.preventDefault();
        dropbox.classList.add(dropboxClass);
    });
    dropbox.addEventListener('dragleave', () => {
        dropbox.classList.remove(dropboxClass);
    });
    dropbox.addEventListener('drop', (event) => {
        event.preventDefault();
        dropbox.classList.remove(dropboxClass);
        const files = event.dataTransfer.files;
        handleFile(files[0])
    });
    if (sav) show('dropbox_sav')
}
function savInfo() {
    let player
    if (typeof players != "undefined") player = players.find(player => player.name == localStorage.getItem('username'))
    const name = player ? getPlayerName(player) : `<span style='color:white'>${localStorage.getItem('username') || 'USERNAME'}</span>`
    let HTMLContent = `
    <div>
        CUPHEAD .SAV FILE LOCATIONS:
        <br>Windows: ${myekulColor(`C:\\Users\\${name}\\AppData\\Roaming\\Cuphead`)}
        <br>Mac: ${myekulColor(`/Users/${name}/Library/Application\\ Support/unity.Studio\\ MDHR.Cuphead/Cuphead`)}
    </div>`
    return HTMLContent
}
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
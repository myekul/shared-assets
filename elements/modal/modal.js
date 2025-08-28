function openModal(body, title, subtitle, shh) {
    if (!shh) playSound('cardup')
    if (title) document.getElementById('modal-title').innerHTML = title
    document.getElementById('modal-subtitle').innerHTML = subtitle ? subtitle : ''
    document.getElementById('modal-body').innerHTML = body
    const modal = document.getElementById("modal");
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
    modal.style.display = "block";
    const modalContent = document.getElementById('modal-content')
    modalContent.style.animation = 'modalUp 0.25s ease-out forwards';
    document.addEventListener('keydown', function (event) {
        if (event.key == 'Escape') closeModal()
    });
}
function closeModal() {
    playSound('carddown')
    const modal = document.getElementById("modal");
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    const modalContent = document.getElementById('modal-content')
    modalContent.style.animation = 'modalDown 0.25s ease-out forwards';
    setTimeout(() => {
        hide(modal)
    }, 200);
}
window.onclick = function (event) {
    const modal = document.getElementById("modal");
    if (event.target == modal) {
        closeModal()
    }
}
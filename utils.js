function getDateDif(date1, date2) {
    return Math.floor((date1 - date2) / (100 * 60 * 60 * 24) / 10)
}
function daysAgo(dateDif) {
    dateDif = dateDif.toLocaleString()
    return dateDif == 0 ? 'Today' : dateDif + ` day${dateDif == 1 ? '' : 's'} ago`
}
function toggleVisibility(elem) {
    const element = document.getElementById(elem)
    if (element) {
        if (document.getElementById(elem).style.display == '') {
            hide(elem)
        } else {
            show(elem)
            return 1
        }
    }
}
function show(elem) {
    if (typeof (elem) == 'string') {
        elem = document.getElementById(elem)
    }
    elem.style.display = ''
}
function hide(elem) {
    if (typeof (elem) == 'string') {
        elem = document.getElementById(elem)
    }
    elem.style.display = 'none'
}
function buttonClick(pressed, unpressed, className) {
    document.querySelectorAll('#' + unpressed + ' .button').forEach(button => {
        button.classList.remove(className)
    })
    const button = document.getElementById(pressed)
    button?.classList.add(className)
}
function fontAwesome(icon) {
    return `<i class="fa fa-${icon}"></i>`
}
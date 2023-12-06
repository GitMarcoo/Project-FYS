document.addEventListener('DOMContentLoaded', start)
document.getElementById('menu').addEventListener('click',showMenu)

function showMenu(){
    document.getElementById('navLinks').classList.toggle('displaynone')
    navLinks.style.right = "0px";
}
function closeMenu(){
    document.getElementById('navLinks').classList.toggle('displaynone')
    navLinks.style.right = "-200px";
}
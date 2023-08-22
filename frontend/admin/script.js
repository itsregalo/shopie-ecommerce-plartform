let menuToggler = document.querySelector('.toggler');
let sideBar = document.querySelector('#sidebar-wrapper')

menuToggler.addEventListener('click', (e)=>{
    e.preventDefault();
    sideBar.classList.toggle('d-none')
})
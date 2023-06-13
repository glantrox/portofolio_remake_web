const headerTwo = document.querySelector('.navigations-navbar');
const header = document.querySelector('.navbar');
const hamburger = document.querySelector(".hamburger");

window.addEventListener('scroll', function(){
    header.classList.toggle('sticky', window.scrollY>0);
    hamburger.classList.toggle('sticky', window.scrollY>0);
});

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    headerTwo.classList.toggle("active");
    });
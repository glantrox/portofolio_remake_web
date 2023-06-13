window.addEventListener('scroll', function(){
    const header = document.querySelector('.navbar');
    const hamburger = document.querySelector(".hamburger");

    header.classList.toggle('sticky', window.scrollY>2);
    hamburger.classList.toggle('sticky', window.scrollY>2);
});
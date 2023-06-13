window.addEventListener('scroll', function(){
    const header = document.querySelector('.navbar');
    header.classList.toggle('sticky', window.scrollY>0);
});
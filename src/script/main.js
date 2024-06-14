document.addEventListener(`DOMContentLoaded`, async () => {
    const headerTwo = document.querySelector('.navigations-navbar');
    const header = document.querySelector('.navbar');
    const hamburger = document.querySelector(".hamburger");
    window.addEventListener('scroll', function () {
        header.classList.toggle('sticky', window.scrollY > 0);
        hamburger.classList.toggle('sticky', window.scrollY > 0);
    });

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        headerTwo.classList.toggle("active");
    });

    const response = await fetch('/service/get-portofolios');
    if(!response.ok) {
        const data = response.text();
        return alert (`Check your Connection : ${data}`);
    }
    const resultData = await response.json();
    showPortofolios(resultData);
});

// Additional Functions ============================================================

function showPortofolios(portofolios) {
    const listView = document.getElementById(`lv-projects`);
    portofolios.forEach(prtf => {
        const prtfWrapper = document.createElement(`wrapper-prtf`);
        prtfWrapper.innerHTML = `
        
        <a href="${prtf.source_url}">
                <div class="image-cards-bp position-relative overflow-hidden">
                    <div class="cards-bp-overlay">
                        <h1 class="text-card-sat">${prtf.title}</h1>
                        <h1 class="text-card-sat">${prtf.description}</h1>                        
                    </div>
                    <img src="${prtf.image_url}" alt="" class="card-projects"></img>                    
                </div>
            </a>
        
        `;
        listView.appendChild(prtfWrapper);
    });
}
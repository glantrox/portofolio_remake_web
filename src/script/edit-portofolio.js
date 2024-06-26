// Portofolio ID
const queryParams = new URLSearchParams(document.location.search);
const portofolioId = queryParams.get('id');
    

// OnStart
document.addEventListener(`DOMContentLoaded`, async (event) => {
    event.preventDefault();
        
    const result = await fetch(`/service/get-portofolio?id=${portofolioId}`)

    if(!result.ok) {
        const errorMessage = await result.text();
        return alert(errorMessage);
    }
    const resultData = await result.json();    
    setValues(resultData[0]);
});

const buttonSubmit = document.getElementById(`btn-save`);
buttonSubmit.addEventListener(`click`, async (event) => {
    event.preventDefault();
    const inputTitle = document.getElementById(`title`);
    const inputDescription = document.getElementById(`description`);
    const inputSourceUrl = document.getElementById(`sourceUrl`);
    const inputFile = document.getElementById(`formFile`);

    const formData = new FormData();
    formData.append(`id`, portofolioId)
    formData.append(`title`, inputTitle.value )
    formData.append(`description`, inputDescription.value )
    formData.append(`source_url`, inputSourceUrl.value )
    formData.append(`file`, inputFile.files[0] )

    setLoading(true)
    const result = await fetch(`/service/update-portofolio`, {
        method: `POST`,        
        body: formData
    });

    if(!result.ok) {
        setLoading(false)
        const errorMessage = await result.text();
        return alert(errorMessage);
    }
    setLoading(false)
    window.location.assign('/dashboard');
});

function setLoading(isLoading) {
    const buttonSubmit = document.getElementById(`btn-save`);
    const loadingIndicator = document.getElementById(`loading-modal`);
    if(isLoading) {
        buttonSubmit.style.display = `none`;
        loadingIndicator.style.display = `block`;
    } else {
        buttonSubmit.style.display = `block`;
        loadingIndicator.style.display = `none`;
    }
}


function setValues(data) {
    const inputTitle = document.getElementById(`title`);
    const inputDescription = document.getElementById(`description`);
    const inputSourceUrl = document.getElementById(`sourceUrl`);

    inputTitle.value = data.title;
    inputDescription.value = data.description;
    inputSourceUrl.value = data.source_url;

}
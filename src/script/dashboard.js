// OnStart
document.addEventListener(`DOMContentLoaded`, async () => {    

    const response = await fetch(`/service/get-portofolios`);
    if(!response.ok) {
        const message = await response.text();
        return alert(message);
    }
    const resultData = await response.json();
    return showPortofolios(resultData);
});

// OnTap Logout
const buttonLogout = document.getElementById(`button-logout`);
buttonLogout.addEventListener(`click`, async () => {
    const response = await fetch(`/service/logout-user`, {
        method: `POST`
    });
    if(!response.ok) {
        const errorMessage = await response.text();
        console.log(`Error`)
        return alert(`Unable to Logout : ${errorMessage}`);
    }
    console.log(`Logout Succeed`)
    window.location.assign(`/`)
});

// OnTap Upload
const buttonUpload = document.getElementById(`button-upload-ptf`);
buttonUpload.addEventListener(`click`, async () => {
    const inputImage = document.getElementById(`formFile`);
    const inputTitle = document.getElementById(`title-name`);
    const inputDesc = document.getElementById(`desc-text`);
    const inputUrl = document.getElementById(`url-portofolio`);

    const formData = new FormData();
    formData.append('file', inputImage.files[0]);
    formData.append('title', inputTitle.value);
    formData.append('description', inputDesc.value);
    formData.append('source_url', inputUrl.value);

    const fileSizeInBytes = inputImage.files[0].size;
    const maxSizeInBytes = 20 * 1024 * 1024;         

    if (fileSizeInBytes > maxSizeInBytes) {
        return showError('Max file size is 20 Megabytes!');
    }

    if (!inputImage.files || !inputTitle.value || !inputDesc.value || !inputUrl.value) {
        return showError('Fill the empty Form(s)');
    }

    setLoading(true);
    await fetch(`/service/upload-portofolio`, {
        method: `POST`,        
        body: formData
    }).then(async response => {
        if (!response.ok) {
            setLoading(false);
            const errorMessage = await response.json();
            return showError(errorMessage);            
        }
        await location.reload(true);
        setLoading(false);                
    }).catch(error => {
        setLoading(false);
        showError(error.message);
    });
});


// Additional Functions ==================================================================================

function showPortofolios(portofolios) {    
    const listView = document.getElementById(`result-list`);

    portofolios.forEach(prtf => {        
        const specificDate = new Date(prtf.created_at);
        const dateString = specificDate.toDateString(); // "Sat Jun 13 2024"
        const domain = new URL(prtf.source_url).hostname;


        const prtfWrapper = document.createElement(`prtf-wrapper`);
        prtfWrapper.innerHTML = `
        <a href="/admin/edit-portofolio?id=${prtf.id}" data-bs-toggle="modalEdit" class="item-portofolio">
        <ul class="list-item">
        <li>${prtf.title}</li>
        <li>        
        ${domain}        
        </li>
        <li>${dateString}</li>
        </ul>
        </a>
        `;
        listView.appendChild(prtfWrapper);
    });
}

 function showError(message) {
    const errorBoxMessage = document.getElementById(`alert-wrapper`);
    errorBoxMessage.innerHTML = `
         <div class="alert alert-danger alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
}

function setLoading(isLoading) {
    const btnsForm = document.getElementById(`wrapper-buttons`)
    const loading = document.getElementById(`loading-modal`);

    if(isLoading) {        
        btnsForm.style.display = "none";
        loading.style.display = "block";
    } else {        
        btnsForm.style.display = "block";
        loading.style.display = "none";
    }
}
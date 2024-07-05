
const inputPassword = document.getElementById(`input-password`);
inputPassword.addEventListener(`keyup`, async (event) => {
    if(event.key == `Enter`) {
        event.preventDefault();        
        // Authenticate User
        const response = await fetch(`/service/auth-user?password=${inputPassword.value}`);        
        if(!response.ok) {
            console.log('Error Login')
            const errorMessage = await response.text();
            return alert(errorMessage);            
        }                        
        console.log('Succeed Login')
        window.location.assign(`/dashboard`)
    }
});
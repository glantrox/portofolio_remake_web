// OnStart
document.addEventListener(`DOMContentLoaded`, async () => {
    // Middleware Typashi
    let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
        const loginOverlay = document.querySelector(".login-check-bg");
        loginOverlay.remove();
    } else {
        // Login overlay
        const buttonLogin = document.getElementById("btn-login");
        buttonLogin.addEventListener("click", () => {
            const inputPassword = document.getElementById("input-password");
            const loginOverlay = document.querySelector(".login-check-bg");

            if (inputPassword.value == "") return;

            if (inputPassword.value == "Izan2006*") {
                localStorage.setItem("isLoggedIn", true);
                loginOverlay.remove();
            } else {
                localStorage.setItem("isLoggedIn", false);
                window.location.href = '/'
            }
        });
    }
});

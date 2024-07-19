const localStorage = require(`store`);

module.exports = {
    authMiddleware: async (req,res, next) => {                
        const isLoggedIn = localStorage.get(`auth`).isLoggedIn;
        console.log(`Middleware LoggedIn : `, isLoggedIn);
        // Re-Authenticate to Login Screen
        if(!isLoggedIn) {
            return res.redirect(`/login`);
        }
        next();
    }
}
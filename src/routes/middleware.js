const localStorage = require(`store`);

module.exports = {
    authMiddleware: async (req,res, next) => {                
        const loginStatus = localStorage.get(`auth`).isLoggedIn;
        console.log(`Middleware LoggedIn : `, loginStatus);
        // Re-Authenticate to Login Screen
        if(!loginStatus) {                  
            return res.redirect(`/login`);
        }
        next();
    }
}
const localStorage = require(`store`);

module.exports = {
    authMiddleware: async (req,res, next) => {                
        const isLoggedIn = localStorage.get(`auth`)
        // Re-Authenticate to Login Screen
        if(!isLoggedIn) {
            return res.redirect(`/login`);
        }
        next();
    }
}
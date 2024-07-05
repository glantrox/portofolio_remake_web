const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./scratch');

module.exports = {
    authMiddleware: async (req,res, next) => {                
        const isLoggedIn = localStorage.getItem(`isLoggedIn`)        
        // Re-Authenticate to Login Screen
        if(!isLoggedIn) {
            return res.redirect(`/login`);
        }
        next();
    }
}
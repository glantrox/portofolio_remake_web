const localStorage = require(`store`);

const storage = localStorage.get(`auth`)
if(storage === null || storage === undefined) {
    localStorage.set(`auth`, {
        isLoggedIn : false
      });
}

module.exports = {
    checkAuth: async (req,res, next) => {                
        const loginStatus = localStorage.get(`auth`).isLoggedIn;
        console.log(`Middleware LoggedIn : `, loginStatus);
        // Re-Authenticate to Login Screen
        if(!loginStatus) {                  
            return res.redirect(`/login`);
        }
        next();
    }
}
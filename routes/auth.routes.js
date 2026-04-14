const authControllers = require("../controllers/auth.controllers")
const {isAuthenticated} = require("../middleware/auth.middleware")
const userValidate = require("../middleware/userValidator")
const routes = (app) => {
    app.post("/mba/api/v1/auth/signup",userValidate,authControllers.signup)
     app.post("/mba/api/v1/auth/signin",authControllers.signin)
   app.post("/mba/api/v1/auth/reset",isAuthenticated,authControllers.resetPassword)
}

module.exports = routes
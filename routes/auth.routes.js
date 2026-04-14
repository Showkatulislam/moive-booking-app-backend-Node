const authControllers = require("../controllers/auth.controllers")
const userValidate = require("../middleware/userValidator")
const routes = (app) => {
    app.post("/mba/api/v1/auth/signup",userValidate,authControllers.signup)
     app.post("/mba/api/v1/auth/signin",authControllers.signin)
/*    app.post("/mba/api/v1/auth/reset",authControllers.resetPassword) */
}

module.exports = routes
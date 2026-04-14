const userControllers = require("../controllers/user.controllers")
const authMiddleware = require("../middleware/auth.middleware")
const routes = (app) => {
    app.get("/mba/api/v1/users",
        authMiddleware.isAuthenticated,
        authMiddleware.isAdmin,
        userControllers.getAllUsers)
        
    app.patch("/mba/api/v1/users/:id",
        authMiddleware.isAuthenticated,
        authMiddleware.isAdmin
        ,userControllers.update
    )
}

module.exports = routes;
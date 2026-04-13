const theatreControllers = require("../controllers/theatre.controllers");
const validateTheatre = require("../middleware/theatreValidator");

const routes = (app) => {
    app.post("/mba/api/v1/theatre", validateTheatre, theatreControllers.create);

    app.delete("/mba/api/v1/theatre/:id", theatreControllers.destroy)
    
    app.get("/mba/api/v1/theatre/:id", theatreControllers.getTheatreById)
    
    app.get("/mba/api/v1/theatre", theatreControllers.fetchAllTheatre)
    
    app.put("/mba/api/v1/theatre/:id",theatreControllers.update)
    app.patch("/mba/api/v1/theatre/:id", theatreControllers.update)
}

module.exports = routes
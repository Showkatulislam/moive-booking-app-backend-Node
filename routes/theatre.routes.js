const theatreControllers = require("../controllers/theatre.controllers");
const validateTheatre = require("../middleware/theatreValidator");

const routes = (app) => {
    app.post("/mba/api/v1/theatre", validateTheatre, theatreControllers.create);
    app.delete("/mba/api/v1/theatre/:id",theatreControllers.destroy)
}

module.exports = routes
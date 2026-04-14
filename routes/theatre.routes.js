const theatreControllers = require("../controllers/theatre.controllers");
const isAuthenticated = require("../middleware/auth.middleware");
const validateTheatre = require("../middleware/theatreValidator");
const validateUpdateMovie = require("../middleware/validateUpdateMovie");

const routes = (app) => {
    app.post("/mba/api/v1/theatre", validateTheatre, theatreControllers.create);

    app.delete("/mba/api/v1/theatre/:id",isAuthenticated,theatreControllers.destroy)
    
    app.get("/mba/api/v1/theatre/:id", theatreControllers.getTheatreById)

    app.get("/mba/api/v1/theatre", theatreControllers.fetchAllTheatre)
    
    app.put("/mba/api/v1/theatre/:id", theatreControllers.update)
    
    app.patch("/mba/api/v1/theatre/:id", theatreControllers.update)

    app.patch("/mba/api/v1/theatre/:id/movies",validateUpdateMovie,
        theatreControllers.updateMovies
    )

    app.get("/mba/api/v1/theatres/:id/movies", theatreControllers.getMovies)
    
    app.get("/mba/api/v1/theatres/:theatreId/movies/:movieId",theatreControllers.checkMovie)
}

module.exports = routes
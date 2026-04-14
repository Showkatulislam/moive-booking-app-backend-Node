const movieController = require("../controllers/movie.controllers");
const { isAuthenticated, isAdminOrClient } = require("../middleware/auth.middleware");
const validateMovie = require("../middleware/movieValidator");
const route = (app) => {

    app.post("/mba/api/v1/movies", validateMovie, isAuthenticated,
        isAdminOrClient, movieController.createMovie);

    app.delete(
        '/mba/api/v1/movies/:id',
        isAuthenticated,
        isAdminOrClient,
        movieController.deleteMovie
    )

    app.get(
        '/mba/api/v1/movies/:id',
        movieController.getMovie
    )

    app.put(
        "/mba/api/v1/movies/:id",
        isAuthenticated,
        isAdminOrClient,
        movieController.updateMovie
    )

    app.patch(
        "/mba/api/v1/movies/:id",
        isAuthenticated,
        isAdminOrClient,
        movieController.updateMovie
    )

    app.get(
        "/mba/api/v1/movies",
        movieController.getMovies
    )
}

module.exports = route
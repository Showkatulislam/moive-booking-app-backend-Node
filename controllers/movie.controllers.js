const movieService = require("../services/movie.service")
const { errorResponseBody, successResponseBody } = require("../utils/responsebody")
/**
 * controller function to create a new movie
 * @param {*} req {name,description ....}
 * @param {*} res 
 * @returns movie created
 */
const createMovie = async (req, res) => {
    try {
        const response = await movieService.createMovie(req.body)
        if (response.err) {
            errorResponseBody.err = err;
            errorResponseBody.message = "Validation failed on few parameters of the request body";
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "Successfully created the movie."
        return res.status(201).json(successResponseBody);
    } catch (error) {
        console.error(error);
        return res.status(500).json(errorResponseBody)
    }
}

/**
 * 
 * @returns 
 */

const deleteMovie = async (req,res) => {
    try {
        const response = await movieService.deleteMovie(req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully deleted the movie.";
        return res.status(200).json(successResponseBody);
    } catch (error) {
        console.log(error);
        return res.status(500).json(errorResponseBody)
    }
}

const getMovie = async (req,res) => {
    try {
        const response = await movieService.getMovieById(req.params.id);
        if (response.err) {
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody)
        }
        successResponseBody.data = response;
        return res.status(200).json(successResponseBody);
    } catch (error) {
        console.log(error)
        return res.status(500).json(errorResponseBody)
    }
}

const updateMovie = async (req,res) => {
    try {
        const response = await movieService.updateMovie(req.params.id, req.body);
        console.log(response)
        if (response.err) {
            errorResponseBody.err = response.err;
            errorResponseBody.message = "The updates that we are trying to apply doesn't validate the schema."
            return res.status(response.code).json(errorResponseBody)
        }
        successResponseBody.data = response;
        return res.status(200).json(successResponseBody);
    } catch (error) {
        errorResponseBody.err = error;
        errorResponseBody.message = error.message;
        return res.status(500).json(errorResponseBody)
    }
}

const getMovies = async (req, res) => {
    try {
        const response = await movieService.fetchMovie(req.query);
        console.log(response)
        if (response.err) {
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        return res.status(200).json(successResponseBody);
    } catch (error) {
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody)
    }
}

module.exports = {
    createMovie,
    deleteMovie,
    getMovie,
    updateMovie,
    getMovies
}
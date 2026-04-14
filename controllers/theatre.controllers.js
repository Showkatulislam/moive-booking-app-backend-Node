const theatreService = require("../services/theatre.service")
const { successResponseBody, errorResponseBody } = require("../utils/responsebody")
const {STATUS} = require("../utils/constants")
const create = async (req, res) => {
    try {
        const response = await theatreService.createTheatre(req.body);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully created the theatre."
        return res.status(STATUS.CREATED).json(successResponseBody);
    } catch (error) {
        console.log(error)
        errorResponseBody.error = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
    }
}

const destroy = async (req, res) => {
    try {
        const response = await theatreService.destroy(req.params.id)
        successResponseBody.data = response;
        successResponseBody.message = "Theatre is deleted successfully."
        return res.status(STATUS.CREATED).json(successResponseBody)
    } catch (error) {
        errorResponseBody.err = error;
        errorResponseBody.message = error.message
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
    }
}

const getTheatreById = async (req,res) => {
    try {
        const response = await theatreService.getTheatreById(req.params.id)
        successResponseBody.data = response;
        successResponseBody.message = "Data fetched successfully."
        return res.status(STATUS.CREATED).json(successResponseBody)
    } catch (error) {
        errorResponseBody.err = error;
        errorResponseBody.message = error.message;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
    }
}

const fetchAllTheatre = async (req,res) => {
    try {
        const response = await theatreService.fetchAllTheatre(req.query)
        successResponseBody.data = response;
        successResponseBody.message = "successfully fatched all the threatres."
        return res.status(STATUS.OK).json(successResponseBody);
    } catch (error) {
        errorResponseBody.err = error;
        errorResponseBody.message = error.message;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
    }
}

const update = async (req,res) => {
    try {
        console.log(req.body)
        const response = await theatreService.update(req.params.id, req.body);
        console.log(response)
        successResponseBody.data = response;
        successResponseBody.message = "Successfully updated data."
        return res.status(STATUS.OK).json(successResponseBody
        );
    } catch (error) {
        errorResponseBody.err = error;
        errorResponseBody.message = error.message;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const updateMovies = async (req, res) => {
    try {
        const response = await theatreService.updateMoviesInTheatre(req.params.id, req.body.movieIds, req.body.insert);
        if (response.err) {
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody)
        }
        successResponseBody.data = response;
        successResponseBody.message = "successfully updated movies in the theatre.";
        return res.status(STATUS.OK).json(successResponseBody)

    } catch (error) {
        console.log(error);
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getMovies = async (req, res) => {
    try {
        const response = await theatreService.getMoviesInTheatre(req.params.id)
        if (response.err) {
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody)
        }
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched the movies for the theatre."
        return res.status(STATUS.OK).json(successResponseBody)
    } catch (error) {
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
    }
}

const checkMovie = async (req, res) => {
    try {
        const response = await theatreService.checkMovieInATheatre(req.theatreId, req.movieId);
        if (response.err) {
            errorResponseBody.err = response.err;
            return res.status(response.code).json(errorResponseBody)
        }
        successResponseBody.data = response;
        successResponseBody.message = "successfully checked movie is present in the theatre."
        return res.status(STATUS.OK).json(successResponseBody)
    } catch (error) {
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

module.exports = {
    create,
    destroy,
    getTheatreById,
    fetchAllTheatre,
    update,
    updateMovies,
    getMovies,
    checkMovie
}
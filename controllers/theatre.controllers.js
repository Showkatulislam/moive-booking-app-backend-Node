const theatreService = require("../services/theatre.service")
const {successResponseBody,errorResponseBody} = require("../utils/responsebody")
const create = async (req, res) => {
    try {
        const response = await theatreService.createTheatre(req.body);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully created the theatre."
        return res.status(201).json(successResponseBody);
    } catch (error) {
        console.log(error)
        errorResponseBody.error = error;
        return res.status(500).json(errorResponseBody)
    }
}

const destroy = async (req, res) => {
    try {
        const response = await theatreService.destroy(req.params.id)
        successResponseBody.data = response;
        successResponseBody.message = "Theatre is deleted successfully."
        return res.status(200).json(successResponseBody)
    } catch (error) {
        errorResponseBody.err = error;
        errorResponseBody.message = error.message
        return res.status(400).json(errorResponseBody)
    }
}

const getTheatreById = async (req,res) => {
    try {
        const response = await theatreService.getTheatreById(req.params.id)
        successResponseBody.data = response;
        successResponseBody.message = "Data fetched successfully."
        return res.status(201).json(successResponseBody)
    } catch (error) {
        errorResponseBody.err = error;
        errorResponseBody.message = error.message;
        return res.status(500).json(errorResponseBody)
    }
}

const fetchAllTheatre = async (req,res) => {
    try {
        const response = await theatreService.fetchAllTheatre(req.query)
        successResponseBody.data = response;
        successResponseBody.message = "successfully fatched all the threatres."
        return res.status(200).json(successResponseBody);
    } catch (error) {
        errorResponseBody.error = error;
        errorResponseBody.message = error.message;
        return res.status(500).json(errorResponseBody)
    }
}

const update = async (req,res) => {
    try {
        console.log(req.body)
        const response = await theatreService.update(req.params.id, req.body);
        console.log(response)
        successResponseBody.data = response;
        successResponseBody.message = "Successfully updated data."
        return res.status(200).json(successResponseBody
        );
    } catch (error) {
        errorResponseBody.error = error;
        errorResponseBody.message = error.message;
        return res.status(500).json(errorResponseBody);
    }
}

module.exports = {
    create,
    destroy,
    getTheatreById,
    fetchAllTheatre,
    update
}
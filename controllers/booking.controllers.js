const {STATUS} = require('../utils/constants')
const { errorResponseBody, successResponseBody } = require('../utils/responsebody')
const bookingServices = require("../services/booking.services")
const create = async (req, res) => {
    try {
        const userId = req.user.id;
        const response = await bookingServices.createBooking({ ...req.body, userId: userId })
        successResponseBody.message = "Successfully created a booking."
        successResponseBody.data = response;
        return res.status(STATUS.CREATED).json(successResponseBody)
    } catch (error) {
        errorResponseBody.err = error;
        errorResponseBody.message = error.message
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
    }
}

const update = async (req,res) => {
    try {
        const response = await bookingServices.update(req.body, req.params.id)
        successResponseBody.data = response;
        successResponseBody.message = "Successfully updated the booking."
        return res.status(STATUS.OK).json(successResponseBody)
    } catch (error) {
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
    }
}
const getBookings = async (req, res) => {
    try {
        const response = await bookingServices.getBookings({ userId: req.user.id })
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched the booking"
        return res.status(STATUS.OK).json(successResponseBody)
    } catch (error) {
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
    }
}

const getAllBookings = async (req, res) => {
    try {
        const response = await bookingServices.getAllBookings({ userId: req.user.id })
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched the booking"
        return res.status(STATUS.OK).json(successResponseBody)
    } catch (error) {
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
    }
}
const getBookingId = async (req, res) => {
    try {
        const response = await bookingServices.getBookingId(req.params.id, req.user.id);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched the booking."
        return res.status(STATUS.OK).json(successResponseBody)
    } catch (error) {
        errorResponseBody.err = error;
        errorResponseBody.message = error.message;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
    }
}
module.exports = {
    create,
    update,
    getBookings,
    getAllBookings,
    getBookingId
}
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
module.exports = {
    create
}
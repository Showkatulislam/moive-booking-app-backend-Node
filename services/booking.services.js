const Booking = require("../models/booking.model");
const { STATUS } = require("../utils/constants");

const createBooking = async (data) => {
    try {
        const response = await Booking.create(data);
        return response;
    } catch (error) {
        throw error;
    }
}

const updateBooking = async (data, bookingId) => {
    try {
        const response = await Booking.findByIdAndUpdate(
            bookingId, data, { returnDocument: "after" })
        if (!response) {
            throw {
                err: "No Booking found for the given id",
                code: STATUS.NOT_FOUND
            }
        }
        return response;
    } catch (error) {
        throw error;
    }
}
module.exports = {
    createBooking,
    updateBooking
}
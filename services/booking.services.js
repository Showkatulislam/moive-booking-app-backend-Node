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
const getBookings = async (data) => {
    console.log(data)
    try {
        const response = await Booking.find({
            userId:data.userId
        })
        console.log(response)
        return response;
    } catch (error) {
        throw error;
    }
}
const getAllBookings = async () => {
    try {
        const response = await Booking.find();
        return response
    } catch (error) {
        throw error;
    }
}

const getBookingId = async (id, userId) => {
    try {
        const response = await Booking.findById(id);
        if (!response) {
             throw {
                 err: "No booking records found for the id",
                 code:STATUS.NOT_FOUND
            }
        }
        if (response.userId !== userId) {
            throw {
                err: "Not able to access the booking",
                code:STATUS.UNAUTHORISED
            }
        }
    } catch (error) {
        throw error;
    }
}
module.exports = {
    createBooking,
    updateBooking,
    getBookings,
    getAllBookings,
    getBookingId
}
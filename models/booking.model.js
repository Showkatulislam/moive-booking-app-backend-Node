const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    theatreId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref:"Theatre"
    },
    movieId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref:"Movie"
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
    },
    timing: {
        type: Date,
        required:true
    },
    noOfSeats: {
        type: Number,
        required: true,
        min:[1,"At least 1 seat must be booked"]
    },
    totalCost: {
        type:Number
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["IN_PROCESS", 'CANCELLED', 'SUCCESSFULL','EXPIRED'],
            message:"Invalid booking status"
        },
        default:"IN_PROCESS"
    }

}, { timestamps: true })

module.exports = mongoose.model("Booking",bookingSchema)
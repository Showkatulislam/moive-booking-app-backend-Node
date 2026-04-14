const mongoose = require("mongoose")
const paymentSchema = new mongoose.Schema({
    bookingId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref:"Booking"
    },
    amount: {
        type: Number,
        required:true
    },
    status: {
        type: String,
        required: true,
        enum: ['SUCCESS', 'FAILED', 'PENDING'],
        default:"PENDING"
    }
}, { timestamps: true })

const payment = mongoose.model("Payment", paymentSchema);

module.exports = payment
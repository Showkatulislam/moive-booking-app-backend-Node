const mongoose = require("mongoose");

const theatreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    address: String,
    isActive: {
        type: Boolean,
        default: true
    },
    movies: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Movie"
    }
}, { timestamps: true })

const Theatre = mongoose.model("Theatre", theatreSchema);

module.exports = Theatre;
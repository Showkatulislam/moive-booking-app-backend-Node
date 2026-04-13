const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, "Please use a valid email address"]
    },
    password: {
        type: String,
        required: true,
        minLength: [5, "Password would be minimum 4 charecter."],
        trim: true
    },
    userRole: {
        type: String,
        enum: ["CUSTOMER", "ADMIN"],
        default: "CUSTOMER"
    },
    userStatus: {
        type: String,
        enum: ["APPROVED", "PENDING", "BLOCKED"],
        default: "APPROVED"
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema);

module.exports = User;
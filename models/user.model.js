const { default: mongoose } = require("mongoose");
const bcryptjs = require("bcryptjs")
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
        enum: ["CUSTOMER", "ADMIN","CLIENT"],
        default: "CUSTOMER"
    },
    userStatus: {
        type: String,
        enum: ["APPROVED", "PENDING", "BLOCKED"],
        default: "APPROVED"
    }
}, { timestamps: true })

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    console.log(this.password)
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    console.log(this.password)

});

userSchema.methods.isValidPassword = async function (plainPassword) {
    const compare = await bcryptjs.compare(plainPassword, this.password);
    return compare;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
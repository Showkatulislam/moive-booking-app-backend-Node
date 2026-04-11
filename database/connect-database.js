const mongoose = require("mongoose")
const { dburl } = require("../config/env")

const connectDB = async () => {
    try {
        await mongoose.connect(dburl);
        console.log("mogoose connection done.")
    } catch (error) {
        console.log("DB connection error", error);
        process.exit(1)
    }
}

module.exports = connectDB
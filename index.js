const express = require("express");
const bodyParser = require("body-parser");

const { port } = require("./config/env");
const connectDB = require("./database/connect-database");
// import route 
const movieRoute = require("./routes/movie.routes")
const theatreRoute = require("./routes/theatre.routes");
const { default: mongoose } = require("mongoose");

const app = express()
app.use(bodyParser.json())
mongoose.set("debug",true)


movieRoute(app)
theatreRoute(app) // theatre routes

app.get("/ping", (req,res) => {
    res.status(200).json({message:"Server is running."})
})

app.listen(port, async () => {
    console.log(`Server is running at https//:localhost:${port}`)
    await connectDB()
})


const express = require("express");
const bodyParser = require("body-parser");

const { port } = require("./config/env");
const connectDB = require("./database/connect-database");
// import route 
const movieRoute = require("./routes/movie.routes")
const theatreRoute = require("./routes/theatre.routes");
const authRoute = require("./routes/auth.routes");
const userRoute = require("./routes/user.routes");
const bookingRoute = require("./routes/booking.routes");

const app = express()
app.use(bodyParser.json())


movieRoute(app)
theatreRoute(app) // theatre routes
authRoute(app)
userRoute(app)
bookingRoute(app)

app.get("/ping", (req,res) => {
    res.status(200).json({message:"Server is running."})
})

app.listen(port, async () => {
    console.log(`Server is running at https//:localhost:${port}`)
    await connectDB()
})


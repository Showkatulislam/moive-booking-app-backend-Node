const express = require("express");

const bodyParser = require("body-parser");
const { port } = require("./config/env");
const connectToDB = require("./database/dbconnect");


const app = express()
app.use(bodyParser.json())

app.get("/ping", (req,res) => {
    res.status(200).json({message:"Server is running."})
})
app.post("/info", (req, res) => {
    console.log(req.body)
    res.status(201).json(req.body)
})
app.listen(port, async () => {
    await connectToDB()
    console.log(`Server is running at https//:localhost:${port}`)
})


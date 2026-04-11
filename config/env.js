const env = require("dotenv")
env.config({ path: ".env.development" })
const {PORT:port,DB_URL:dburl } = process.env
module.exports = {port,dburl}
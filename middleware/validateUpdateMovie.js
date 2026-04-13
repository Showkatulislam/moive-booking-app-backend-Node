const { errorResponseBody } = require("../utils/responsebody")

const validateUpdateMovie = (req,res,next) => {
    if (!req.body.movieIds) {
        errorResponseBody.message = "No Movie present in the request to be updated"
        return res.status(400).json(errorResponseBody)
    }
    next()
}

module.exports = validateUpdateMovie
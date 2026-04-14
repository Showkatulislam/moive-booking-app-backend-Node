const jwt = require("jsonwebtoken");
const { errorResponseBody } = require("../utils/responsebody");
const { getUserById } = require("../services/auth.services");

const isAuthenticated = async (req,res,next) => {
    try {
        const token = req.headers["x-access-token"];
        if (!token) {
            errorResponseBody.err = "No token provided."
            return res.status(403).json(errorResponseBody)
        }
        const response = jwt.verify(token, "saikat");
        if (!response) {
            errorResponseBody.err = "Token not verified"
            return res.status(404).json(errorResponseBody);
        }
        const user = await getUserById(response.id);
        req.user = user;
        next()
    } catch (error) {
        if (error.code == 404) {
            errorResponseBody.err = "User doesn't exist."
            return res.status(404).json(errorResponseBody)
        }
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody)
    }
}

module.exports = isAuthenticated;
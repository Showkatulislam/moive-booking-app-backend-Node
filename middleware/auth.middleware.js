const jwt = require("jsonwebtoken");
const { errorResponseBody } = require("../utils/responsebody");
const { getUserById } = require("../services/auth.services");
const { USER_ROLE,STATUS } = require("../utils/constants");

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        if (!token) {
            errorResponseBody.err = "No token provided."
            return res.status(STATUS.FORBIDDEN).json(errorResponseBody)
        }
        const response = jwt.verify(token, "saikat");
        if (!response) {
            errorResponseBody.err = "Token not verified"
            return res.status(STATUS.UNAUTHORISED).json(errorResponseBody);
        }
        const user = await getUserById(response.id);
        req.user = user;
        next()
    } catch (error) {
        if (error.code == 404) {
            errorResponseBody.err = "User doesn't exist."
            return res.status(STATUS.NOT_FOUND).json(errorResponseBody)
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody)
    }
}

const isAdmin = async (req, res, next) => {
    const user = await getUserById(req.user.id);
    if (!user) {
        errorResponseBody.err = "User is not found."
        return res.status(STATUS.NOT_FOUND).json(errorResponseBody)
    }
    if (user.userRole !== USER_ROLE.admin) {
        errorResponseBody.err = "User is not an admin,cannot proceed with the request."
        return res.status(STATUS.BAD_REQUEST).json(errorResponseBody)
    }
    next()
}

const isClient = async (req, res, next) => {
    const user = await getUserById(req.user.id);
    if (user.userRole !== USER_ROLE.client) {
        errorResponseBody.err = "User is not an client,cannot proceed with the request."
        return res.status(STATUS.UNAUTHORISED).json(errorResponseBody)
    }
    next()
}
const isAdminOrClient = async (req, res, next) => {
    const user = await getUserById(req.user.id);
    if (user.userRole !== USER_ROLE.admin && user.userRole !== USER_ROLE.client) {
        errorResponseBody.err= " User is neither a client not and admin ,cannot procced with the request."
        return res.status(STATUS.UNAUTHORISED).json(errorResponseBody)
    }
    next()
}

module.exports = {
    isAuthenticated,
    isAdmin,
    isClient,
    isAdminOrClient
};
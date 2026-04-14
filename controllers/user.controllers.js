const userServices = require("../services/auth.services");
const {errorResponseBody,successResponseBody}= require("../utils/responsebody")

const update = async (req, res) => {
    try {
        const response = await userServices.updateUserRoleOrStatus(req.body, req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = "Successfully updated the user";
        return res.status(200).json(successResponseBody)
    } catch (error) {
        if (error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody)
        }
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody)
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userServices.getAllUsers();
        successResponseBody.data = users;
        return res.status(200).json(successResponseBody)
    } catch (error) {
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody)
    }
}

module.exports = {
    update,
    getAllUsers
}
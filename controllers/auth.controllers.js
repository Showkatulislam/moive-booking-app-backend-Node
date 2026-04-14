const jwt = require("jsonwebtoken");
const authServies = require("../services/auth.services")
const {successResponseBody,errorResponseBody} = require("../utils/responsebody")
const signup = async (req, res) => {
    try {
        const response = await authServies.createUser(req.body);
        successResponseBody.data = response;
        successResponseBody.message = "User created successfully."
        console.log(successResponseBody)
        return res.status(201).json(successResponseBody);
    } catch (error) {
        errorResponseBody.err = error;
        errorResponseBody.message = error.message;
        return res.status(500).json(errorResponseBody)
    }
}

const signin = async (req, res) => {
    try {
        const user = await authServies.getUserByEmail(req.body.email);
        console.log(user)
        const isValidPassword = await user.isValidPassword(req.body.password);
        if (!isValidPassword) {
            throw { err: "Invalid password for the given email", code:401}
        }
        const token = jwt.sign({
            id:user.id,email:user.email
        },
            "saikat",
        {expiresIn:"1D"}

        )
        successResponseBody.message = "successfully logged in";
        successResponseBody.data = {
            email: user.email,
            role: user.userRole,
            status: user.userStatus,
            token:token
        }
        return res.status(200).json(successResponseBody)
    } catch (error) {
        if (error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        console.log(error);
        errorResponseBody.err = error;
        return res.status(500).json(errorResponseBody); 
    }
}

const resetPassword = async (req, res) => {
    
}

module.exports = {
    signin,
    signup,
    resetPassword
}
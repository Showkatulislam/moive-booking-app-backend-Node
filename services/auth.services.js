const User = require("../models/user.model")
const createUser = async (data) => {
    try {
        if (data.userRole && data.userRole != "CUSTOMER") {
            data.userStatus = "PENDING"
        }
        const response = await User.create(data);
        console.log(response)
        return response
    } catch (error) {
        throw error;
    }
}

const getUserByEmail = async (email) => {
    try {
        const response = await User.findOne({ email: email });
        if (!response) {
            throw {err:"No User found for the given email",code:404}
        }
        return response;
    } catch (error) {
        throw error;
    }
}

const getUserById = async (id) => {
    try {
        const response = await User.findById(id);
        if (!response) {
            throw {
                err: "User not Found.",
                code:404
            }
        }
        return response;
    } catch (error) {
        throw error;
    }
}
const updateUserRoleOrStatus = async (data, id) => {
    try {
        console.log(data,id)
        let updateQuery = {}
        if (data.userRole) {
            updateQuery.userRole = data.userRole;
        }
        if (data.userStatus) {
            updateQuery.userStatus = data.userStatus;
        }
        let response = await User.findOneAndUpdate({
            _id: id,
        }, updateQuery,{returnDocument:"after"});
        console.log(response,updateQuery)
        if (!response) {
            throw {err:"No user found for given id",code:404}
        }
        return response;

    } catch (error) {
        throw error;
    }
}
const getAllUsers = async () => {
    const response = await User.find()
    return response
}
module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    updateUserRoleOrStatus,
    getAllUsers
}
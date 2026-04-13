const Theatre = require("../models/theatre.model")

const createTheatre = async (data) => {
    try {
        const response = await Theatre.create(data)
        return response
    } catch (error) {
        console.log(error);
        throw error;
    }
}
const destroy = async (id) => {
    const response = await Theatre.findByIdAndDelete(id)
    if (!response) {
        throw Error("Theatre is not Found.")
    }
    return response;
}

module.exports = {
    createTheatre,
    destroy
}
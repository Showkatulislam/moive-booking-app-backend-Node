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
/**
 * 
 * @param {*} id 
 * @returns 
 */
const getTheatreById = async (id) => {
    try {
        const response = await Theatre.findById(id);
        if (!response) {
            throw Error("Theatre is not Found.")
        }
        return response
    } catch (error) {
        throw error
    }
}

const fetchAllTheatre = async (data) => {
    try {
        let query = {};
        let pagination = {};
        if (data && data.city) {
            query.city = data.city;
        }
        if (data && data.pincode) {
            query.pincode = data.pincode;
        }
        if (data && data.name) {
            query.name = data.name;
        }
        if (data && data.limit) {
            pagination.limit = data.limit;
        }
        if (data && data.skip) {
            let perPage = (data.limit) ? data.limit : 3
            pagination = data.skip * perPage;
        }
        const response = await Theatre.find(query, {}, pagination);
        return response;
    } catch (error) {
        throw error;
    }
}

const update = async (id,data) => {
    try {
        const response = await Theatre.findByIdAndUpdate(id, data,{returnDocument:"after"})
        if (!response) {
            throw Error("Theatre is not Found.")
        }
        return response;
    } catch (error) {
        throw Error;
    }
}
module.exports = {
    createTheatre,
    destroy,
    getTheatreById,
    fetchAllTheatre,
    update
}


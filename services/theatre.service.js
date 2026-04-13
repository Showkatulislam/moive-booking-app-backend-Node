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

const update = async (id, data) => {
    try {
        const response = await Theatre.findByIdAndUpdate(id, data, { returnDocument: "after" })
        if (!response) {
            throw Error("Theatre is not Found.")
        }
        return response;
    } catch (error) {
        throw Error;
    }
}
/**
 * 
 * @param {*} theatreId 
 * @param {*} movieIds 
 * @param {*} insert 
 * @returns 
 */
const updateMoviesInTheatre = async (theatreId, movieIds, insert) => {
    const theatre = await Theatre.findById(theatreId)
    if (!theatre) {
        return {
            err: "No such Theatre for provided Id.",
            code: 404
        }
    }
    if (insert) {
        movieIds.forEach(movieId => {
            theatre.movies.push(movieId)
        })
    } else {
        let saveMovieIds = theatre.movies;
        movieIds.forEach(movieId => {
            saveMovieIds = saveMovieIds.filter(smi => movieId === smi);
        })
        theatre.movies = saveMovieIds;
    }
    await theatre.save();
    return theatre;


}
module.exports = {
    createTheatre,
    destroy,
    getTheatreById,
    fetchAllTheatre,
    update,
    updateMoviesInTheatre
}


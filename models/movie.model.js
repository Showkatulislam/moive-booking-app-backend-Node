const movieSchema = new mongoose.Schema({

    name: { type: String, required: true },

    description: { type: String, required: true },

    casts: { type: [String], required: true },

    trailerUrl: { type: String, required: true },

    language: { type: String, default: "English" },

    releaseDate: { type: Date, required: true },

    director: { type: String, required: true },
    
    releaseStatus: { type: String, default: "RELEASED", enum: ["RELEASED", "UPCOMING", "TRAILER"] }
}, { timestamps: true });

module.exports = mongoose.model("Movie", movieSchema);
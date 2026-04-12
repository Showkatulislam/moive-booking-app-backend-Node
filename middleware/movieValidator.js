const { body, validationResult } = require('express-validator');

const validateMovie = [
    body('name').trim().notEmpty().withMessage('Movie name is required'),

    body('description').trim().notEmpty().withMessage('Description is required'),

    body('casts')
        .isArray({ min: 1 }).withMessage('Casts must be an array with at least one name')
        .custom((value) => value.every(item => typeof item === 'string'))
        .withMessage('Each cast member must be a string'),

    body('trailerUrl').isURL().withMessage('Please provide a valid trailer URL'),

    body('language').optional().isString().withMessage('Language must be a string'),

    body('releaseDate').isISO8601().toDate().withMessage('Valid release date is required (YYYY-MM-DD)'),

    body('director').trim().notEmpty().withMessage('Director name is required'),

    body('releaseStatus')
        .optional()
        .isIn(['RELEASED', 'UPCOMING', 'TRAILER'])
        .withMessage('Status must be RELEASED, UPCOMING, or TRAILER'),

    // Middleware function to catch and send errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateMovie;

const { body, validationResult } = require('express-validator');

const validateTheatre = [
    body('name')
        .trim()
        .notEmpty().withMessage('Theatre name is required')
        .isString().withMessage('Name must be a string'),

    body('description')
        .optional()
        .trim()
        .isString().withMessage('Description must be a string'),

    body('city')
        .trim()
        .notEmpty().withMessage('City is required'),

    body('pincode')
        .notEmpty().withMessage('Pincode is required')
        .isNumeric().withMessage('Pincode must be a number')
        .isLength({ min: 6, max: 6 }).withMessage('Pincode must be exactly 6 digits'),

    body('address')
        .optional()
        .trim()
        .isString().withMessage('Address must be a string'),

    body('isActive')
        .optional()
        .isBoolean().withMessage('isActive must be a boolean (true/false)'),

    // Error handler middleware
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        next();
    }
];

module.exports = validateTheatre;

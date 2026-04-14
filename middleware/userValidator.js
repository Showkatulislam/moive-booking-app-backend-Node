const { body, validationResult } = require("express-validator");

// Validation rules
const validateUser = [
    body("name")
        .notEmpty().withMessage("Name is required"),

    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email format"),

    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 5 }).withMessage("Password must be at least 5 characters"),

    body("userRole")
        .optional()
        .isIn(["CUSTOMER", "ADMIN"]).withMessage("Invalid user role"),

    body("userStatus")
        .optional()
        .isIn(["APPROVED", "PENDING", "BLOCKED"]).withMessage("Invalid user status"),

    // Middleware to handle errors
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

module.exports = validateUser;
const bookingControllers = require("../controllers/booking.controllers")
const { isAuthenticated } = require("../middleware/auth.middleware")
const { validateBookingCreateRequest } = require("../middleware/booking.middleware")

const route = (app) => {
    app.post("/mba/api/v1/booking", isAuthenticated, validateBookingCreateRequest,bookingControllers.create)
}
module.exports = route
const bookingControllers = require("../controllers/booking.controllers")
const { isAuthenticated } = require("../middleware/auth.middleware")
const { validateBookingCreateRequest, canChangeStatus } = require("../middleware/booking.middleware")

const route = (app) => {
    app.post("/mba/api/v1/booking", isAuthenticated, validateBookingCreateRequest, bookingControllers.create)
    app.patch("/mba/api/v1/booking/:id",
        isAuthenticated,
        canChangeStatus,
        bookingControllers.update)
}
module.exports = route
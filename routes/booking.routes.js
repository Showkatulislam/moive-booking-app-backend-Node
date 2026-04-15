const bookingControllers = require("../controllers/booking.controllers")
const { isAuthenticated,isAdmin } = require("../middleware/auth.middleware")
const { validateBookingCreateRequest, canChangeStatus } = require("../middleware/booking.middleware")

const route = (app) => {
    app.post("/mba/api/v1/booking",
        isAuthenticated, validateBookingCreateRequest, bookingControllers.create)
    
    app.patch("/mba/api/v1/booking/:id",
        isAuthenticated,
        canChangeStatus,
        bookingControllers.update)
    
    app.get("/mba/api/v1/bookings",
        isAuthenticated,
        bookingControllers.getBookings
    )
    app.get("/mba/api/v1/bookings/all",
        isAuthenticated,
        isAdmin,
        bookingControllers.getAllBookings
    )
    app.get("/mba/api/v1/booking/:id",
        isAuthenticated,
        bookingControllers.getBookingId
    )
}
module.exports = route
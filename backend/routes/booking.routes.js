const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');

router.post('/', bookingController.createBooking);
router.get('/provider/:providerId', bookingController.getBookingsByProvider);
router.get('/user/:userId', bookingController.getBookingsByUser);
router.put('/:id/status', bookingController.updateBookingStatus);
router.patch('/reschedule/:id', bookingController.rescheduleBooking);
router.put('/:id/cancel', bookingController.cancelBooking);


module.exports = router;

const express = require('express');
const bookingController = require('../app/controllers/booking_controller');
const tickController = require('../app/controllers/tick_controller');
const resetController = require('../app/controllers/reset_controller');
const helpers = require('./helpers');

const router = express.Router();


router.route('/book')
  .post(bookingController.createBooking);

router.route('/tick')
  .post(tickController.incrementTimeUnit);

router.route('/reset')
  .post(resetController.resetCarData);


module.exports = router;

const createError = require('http-errors');
const helpers = require('../../app/helpers');

/**
 * 1) get all available cars
 * 2) for each car calculate the distance with customer
 * 3) find the closest car (if multiple, car with the lowest id)
 * 4) set the car to booked
 * 5) return the car_id & total_time
 */
exports.createBooking = (req, res, next) => {
  if (!req.body.source) {
    next(createError(400, 'Missing source'));
  }
  if (!req.body.destination) {
    next(createError(400, 'Missing destination'));
  }
  // get all available cars
  helpers.getAvailableCars()
    .then((availableCars) => {
      // for each available car calculate its distance with the customer
      // + store/update the minimum distance
      // + store/update the corresponding car index
      let minCarDistance = Infinity;
      let minCarId;
      availableCars.forEach((car, i) => {
        // compute distance between car and customer
        const carDistance = helpers.computeDistance(car, req.body.source);
        // check if the car verifies minimum distance requirements
        // if yes update minCarDistance & minCarId accordingly
        if (carDistance < minCarDistance) {
          minCarDistance = carDistance;
          minCarId = car.id;
        } else if (carDistance === minCarDistance) {
          minCarId = minCarId ? ((car.id < minCarId) ? car.id : minCarId) : car.id;
        }
      });
      // found a car
      if (minCarId) {
        // compute the customer travel distance
        const customerTripDistance = helpers.computeDistance(req.body.source, req.body.destination);
        // compute the total_time during which the car will be booked
        const totalTime = minCarDistance + customerTripDistance;
        // set the car to booked
        helpers.setCarBooked(minCarId, req.body.destination, totalTime)
          .then((result) => {
            // send response containing car_id & total_time
            res.json({
              car_id: minCarId,
              total_time: totalTime
            });
          });
      } else {
        // send empty response
        res.json({});
      }
    })
    .catch(err => next(err));
};

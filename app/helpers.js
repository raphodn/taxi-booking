const defaultConfig = require('../config/default');

let serviceData = {};


// =============================================================================
//  INIT

/**
 * [initCar description]
 * @param  {Integer} id [description]
 * @return {[type]}    [description]
 */
function initCar(id) {
  return {
    id: id + 1,
    x: defaultConfig.initPosition[0],
    y: defaultConfig.initPosition[1],
    available: true,
    timeRemaining: 0
  };
}

/**
 * Init the serviceData object
 * @param  {Object} config [description]
 */
exports.initServiceData = (config) => {
  // copy over the app config
  serviceData = config;
  // init the cars
  for (let i = 0; i < config.cars; i += 1) {
    serviceData.carData.push(initCar(i));
  }
};

/**
 * Reset the cars
 */
exports.resetCarData = () => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < serviceData.carData; i += 1) {
      serviceData[i] = initCar(i);
    }
    resolve(true);
  });
};


// =============================================================================
//  TIME

/**
 * increment the service time unit by 1
 * For each car:
 * - decrese by 1 the timeRemaining field
 * - if (timeRemaining === 0) set the car to available
 * @return {[type]} [description]
 */
exports.incrementTimeUnit = () => {
  return new Promise((resolve, reject) => {
    // increment the service up time
    serviceData.timeServiceUp += 1;
    // update cars
    serviceData.carData.forEach((car, i) => {
      if (car.timeRemaining > 0) {
        car.timeRemaining -= 1;
      }
      if (car.timeRemaining === 0) {
        car.available = true;
      }
    });
    resolve(serviceData.timeServiceUp);
  });
};


// =============================================================================
//  DISTANCE

/**
 * Compute the distance between 2 points in a 2D world
 * @param  {Array} a { x: , y: }
 * @param  {Array} b { x: , y: }
 * @return {Integer} the distance between a and b
 */
exports.computeDistance = (a, b) => {
  return ((b.y - a.y) + (b.x - a.x));
};


// =============================================================================
//  CARS

exports.getCar = (carId) => {
  return new Promise((resolve, reject) => {
    resolve(serviceData.carData.find(car => car.id === carId));
  });
};

exports.getAllCars = () => {
  return new Promise((resolve, reject) => {
    resolve(serviceData.carData);
  });
};

exports.getAvailableCars = () => {
  return new Promise((resolve, reject) => {
    resolve(serviceData.carData.filter(car => car.available === true));
  });
};

exports.setCarBooked = (carId, finalPosition, timeBooked) => {
  return new Promise((resolve, reject) => {
    this.getCar(carId).then((car) => {
      // update car
      car.available = false;
      car.x = finalPosition.x;
      car.y = finalPosition.y;
      car.timeRemaining = timeBooked;
      resolve(true);
    });
  });
};

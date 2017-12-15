const helpers = require('./helpers');
const defaultConfig = require('../config/default');

// helpers.initCar = jest.fn();

beforeEach(() => {
  jest.resetAllMocks();
});

describe('initServiceData', () => {
  beforeEach(() => {
    helpers.initCar = jest.fn();
  });
  test('should have called initCar 3 times', () => {
    // before
    const CONFIG = { cars: 3, carData: [] };
    // test
    helpers.initServiceData(CONFIG);
    expect(helpers.initCar).toHaveBeenCalledTimes(3);
  });
  test('should have called initCar 0 times', () => {
    // before
    const CONFIG = { cars: 0, carData: [] };
    // test
    helpers.initServiceData(CONFIG);
    expect(helpers.initCar).toHaveBeenCalledTimes(0);
  });
});

describe('resetCarData', () => {
  beforeEach(() => {
    helpers.initCar = jest.fn();
  });
  test('should have returned true & called initCar 6 (3+3) times', (done) => {
    // before: initServiceData with CONFIG
    const CONFIG = { cars: 3, carData: [] };
    helpers.initServiceData(CONFIG);
    // test: reset car data
    helpers.resetCarData().then((data) => {
      expect(data).toBe(true);
      expect(helpers.initCar).toHaveBeenCalledTimes(3 + 3);
      done();
    });
  });
  test('should have returned true & called initCar 0 times', (done) => {
    // before: initServiceData with CONFIG
    const CONFIG = { cars: 0, carData: [] };
    helpers.initServiceData(CONFIG);
    // test: reset car data
    helpers.resetCarData().then((data) => {
      expect(data).toBe(true);
      expect(helpers.initCar).toHaveBeenCalledTimes(0 + 0);
      done();
    });
  });
});

describe('incrementTimeUnit', () => {
  describe('timeServiceUp field', () => {
    test('should increment the timeServiceUp by 1 and return that value', (done) => {
      // before: set current state
      const STATE = {
        timeServiceUp: 10,
        initPosition: [0, 0],
        cars: 0,
        carData: []
      };
      helpers.setServiceData(STATE);
      // test
      helpers.incrementTimeUnit().then((data) => {
        expect(data).toBe(11);
        const NEW_STATE = helpers.getServiceData();
        expect(NEW_STATE.timeServiceUp).toBe(11);
        done();
      });
    });
  });
  describe('car is available', () => {
    test('it should keep the car\'s timeRemaining to 0', (done) => {
      // before: set current state
      const STATE = {
        timeServiceUp: 10,
        initPosition: [0, 0],
        cars: 1,
        carData: [
          {
            id: 1,
            x: 2,
            y: 4,
            available: true,
            timeRemaining: 0
          }
        ]
      };
      helpers.setServiceData(STATE);
      // test
      helpers.incrementTimeUnit().then((data) => {
        const NEW_STATE = helpers.getServiceData();
        expect(NEW_STATE.carData[0].timeRemaining).toBe(0);
        done();
      });
    });
  });
  describe('car is not available', () => {
    test('it should decrease the car\'s timeRemaining by 1', (done) => {
      // before: set current state
      const STATE = {
        timeServiceUp: 10,
        initPosition: [0, 0],
        cars: 1,
        carData: [
          {
            id: 1,
            x: 2,
            y: 4,
            available: false,
            timeRemaining: 5
          }
        ]
      };
      helpers.setServiceData(STATE);
      // test
      helpers.incrementTimeUnit().then((data) => {
        const NEW_STATE = helpers.getServiceData();
        expect(NEW_STATE.carData[0].timeRemaining).toBe(4);
        done();
      });
    });
    test('if timeRemaining == 1, should decrease the car\'s timeRemaining by 1 and set available to true', (done) => {
      // before: set current state
      const STATE = {
        timeServiceUp: 10,
        initPosition: [0, 0],
        cars: 1,
        carData: [
          {
            id: 1,
            x: 2,
            y: 4,
            available: false,
            timeRemaining: 1
          }
        ]
      };
      helpers.setServiceData(STATE);
      // test
      helpers.incrementTimeUnit().then((data) => {
        const NEW_STATE = helpers.getServiceData();
        expect(NEW_STATE.carData[0].timeRemaining).toBe(0);
        expect(NEW_STATE.carData[0].available).toBe(true);
        done();
      });
    });
  });
});

describe('computeDistance', () => {
  test('should return 0 if source & destination are the same', () => {
    const SOURCE = { x: 1, y: 1 };
    const DESTINATION = { x: 1, y: 1 };
    expect(helpers.computeDistance(SOURCE, DESTINATION)).toBe(0);
  });
  test('should return correct value with source & destination positive', () => {
    const SOURCE = { x: 1, y: 1 };
    const DESTINATION = { x: 2, y: 2 };
    expect(helpers.computeDistance(SOURCE, DESTINATION)).toBe(2);
  });
  test('should return correct value with source & destination negative', () => {
    const SOURCE = { x: -1, y: -1 };
    const DESTINATION = { x: -2, y: -2 };
    expect(helpers.computeDistance(SOURCE, DESTINATION)).toBe(2);
  });
  test('should return correct value with source positive & destination negative', () => {
    const SOURCE = { x: 1, y: 1 };
    const DESTINATION = { x: -2, y: -2 };
    expect(helpers.computeDistance(SOURCE, DESTINATION)).toBe(6);
  });
  test('should return correct value with source negative & destination positive', () => {
    const SOURCE = { x: -1, y: -1 };
    const DESTINATION = { x: 2, y: 2 };
    expect(helpers.computeDistance(SOURCE, DESTINATION)).toBe(6);
  });
});

describe('getCar', () => {
  const STATE = {
    timeServiceUp: 10,
    initPosition: [0, 0],
    cars: 2,
    carData: [
      {
        id: 1,
        x: 2,
        y: 4,
        available: false,
        timeRemaining: 1
      },
      {
        id: 2,
        x: 4,
        y: 6,
        available: true,
        timeRemaining: 0
      }
    ]
  };
  beforeEach(() => {
    helpers.setServiceData(STATE);
  });
  test('it should find and return the correct car object', (done) => {
    helpers.getCar(1).then((data) => {
      expect(data).toEqual(STATE.carData[0]);
      done();
    });
  });
  test('it should return undefined if it cannot find the car', (done) => {
    helpers.getCar(3).then((data) => {
      expect(data).toEqual(undefined);
      done();
    });
  });
  test('it should return undefined if it cannot find the car', (done) => {
    helpers.getCar(3).then((data) => {
      expect(data).toEqual(undefined);
      done();
    });
  });
});

describe('getAllCars', () => {
  const STATE = {
    timeServiceUp: 10,
    initPosition: [0, 0],
    cars: 2,
    carData: [
      {
        id: 1,
        x: 2,
        y: 4,
        available: false,
        timeRemaining: 1
      },
      {
        id: 2,
        x: 4,
        y: 6,
        available: true,
        timeRemaining: 0
      }
    ]
  };
  beforeEach(() => {
    helpers.setServiceData(STATE);
  });
  test('it should return the cars array', (done) => {
    helpers.getAllCars().then((data) => {
      expect(data).toEqual(STATE.carData);
      done();
    });
  });
});

describe('getAvailableCars', () => {
  const STATE = {
    timeServiceUp: 10,
    initPosition: [0, 0],
    cars: 2,
    carData: [
      {
        id: 1,
        x: 2,
        y: 4,
        available: false,
        timeRemaining: 1
      },
      {
        id: 2,
        x: 4,
        y: 6,
        available: true,
        timeRemaining: 0
      }
    ]
  };
  beforeEach(() => {
    helpers.setServiceData(STATE);
  });
  test('it should return only the available car in an array', (done) => {
    helpers.getAvailableCars().then((data) => {
      expect(data).toEqual([STATE.carData[1]]);
      done();
    });
  });
});

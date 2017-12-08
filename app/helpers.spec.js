const helpers = require('./helpers');

helpers.initCar = jest.fn();


describe('initServiceData', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  test('should have called initCar 3 times', () => {
    const CONFIG = { cars: 3, carData: [] };
    helpers.initServiceData(CONFIG);
    expect(helpers.initCar).toHaveBeenCalledTimes(3);
  });
  test('should have called initCar 0 times', () => {
    const CONFIG = { cars: 0, carData: [] };
    helpers.initServiceData(CONFIG);
    expect(helpers.initCar).toHaveBeenCalledTimes(0);
  });
});

// describe.only('resetCarData', () => {
//   beforeEach(() => {
//     jest.resetAllMocks();
//   });
//   test('should have called initCar 3 times', (done) => {
//     const CONFIG = { cars: 3, carData: [{}, {}, {}] };
//     helpers.resetCarData(CONFIG);
//     expect(helpers.initCar).toHaveBeenCalledTimes(3);
//     done();
//   });
//   test('should have called initCar 0 times', (done) => {
//     const CONFIG = { cars: 0, carData: [] };
//     helpers.resetCarData(CONFIG);
//     expect(helpers.initCar).toHaveBeenCalledTimes(0);
//     done();
//   });
// });

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

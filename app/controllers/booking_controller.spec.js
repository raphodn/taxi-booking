const request = require('supertest');
const app = require('../../app');
const bookingController = require('./booking_controller');
const helpers = require('../../app/helpers');


describe('test POST /book', () => {
  it('should return 400 if source is missing from body', (done) => {
    request(app)
      .post('/api/book')
      .send({ destination: {} })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe('Missing source');
        done();
      });
  });
  it('should return 400 if destination is missing from body', (done) => {
    request(app)
      .post('/api/book')
      .send({ source: {} })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe('Missing destination');
        done();
      });
  });
  it('should successfully book a car', (done) => {
    // book
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
    helpers.setServiceData(STATE);
    // test
    request(app)
      .post('/api/book')
      .send({ source: { x: 6, y: 8 }, destination: { x: 8, y: 10 } })
      .expect(200)
      .then((res) => {
        expect(res.body.car_id).toBe(2);
        expect(res.body.total_time).toBe(8);
        done();
      });
  });
});

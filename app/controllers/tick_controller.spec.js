const request = require('supertest');
const app = require('../../app');
const tickController = require('./tick_controller');
const helpers = require('../../app/helpers');


describe('test POST /api/tick', () => {
  it('should successfully increment timeServiceUp and return the current value', (done) => {
    // before
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
      .post('/api/tick')
      .send()
      .expect(200)
      .then((res) => {
        expect(res.body.timeServiceUp).toBe(11);
        const NEW_STATE = helpers.getServiceData();
        expect(NEW_STATE.timeServiceUp).toBe(11);
        expect(NEW_STATE.carData[0].available).toBe(true);
        expect(NEW_STATE.carData[0].timeRemaining).toBe(0);
        done();
      });
  });
});

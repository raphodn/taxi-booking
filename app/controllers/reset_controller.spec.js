const request = require('supertest');
const app = require('../../app');
const resetController = require('./reset_controller');
const helpers = require('../../app/helpers');


describe('test POST /api/reset', () => {
  it('should successfully reset the app state and return 200', (done) => {
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
      .post('/api/reset')
      .send()
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe('success');
        const NEW_STATE = helpers.getServiceData();
        expect(NEW_STATE.carData[0].x).toBe(0);
        expect(NEW_STATE.carData[0].y).toBe(0);
        expect(NEW_STATE.carData[0].available).toBe(true);
        expect(NEW_STATE.carData[0].timeRemaining).toBe(0);
        done();
      });
  });
});

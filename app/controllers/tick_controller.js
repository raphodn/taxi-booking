const helpers = require('../../app/helpers');


exports.incrementTimeUnit = (req, res, next) => {
  helpers.incrementTimeUnit()
    .then((result) => {
      res.json({
        timeServiceUp: result
      });
    })
    .catch(err => next(err));
};

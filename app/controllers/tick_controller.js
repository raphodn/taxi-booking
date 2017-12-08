const helpers = require('../../app/helpers');


exports.incrementTimeUnit = (req, res, next) => {
  helpers.incrementTimeUnit()
    .then((result) => {
      res.json({
        timeStatusUp: result
      });
    })
    .catch(err => next(err));
};

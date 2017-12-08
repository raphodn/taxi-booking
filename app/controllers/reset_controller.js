const helpers = require('../../app/helpers');


exports.resetCarData = (req, res, next) => {
  helpers.resetCarData()
    .then((result) => {
      res.json({
        message: 'success'
      });
    })
    .catch(err => next(err));
};

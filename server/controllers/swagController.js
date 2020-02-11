var swag = require('../models/swag');

var getSwag = (req, res, next) => {
    res.status(200).send(swag);
}

module.exports = {
    read: getSwag
}
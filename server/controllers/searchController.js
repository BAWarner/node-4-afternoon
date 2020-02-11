var swag = require('../models/swag');

var search = (req, res) => {
    var { category } = req.query;

    if(!category){
        res
        .status(200)
        .send(swag)
    }else{
        var swagCategory = swag.filter(swag => swag.category == category);
        
        res
        .status(200)
        .send(swagCategory);
    }

}

module.exports = {
    search
}
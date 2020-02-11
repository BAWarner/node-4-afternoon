var swag = require('../models/swag');

var add = (req, res) => {
    var { user } = req.session;
    var { id } = req.params;
    var index = swag.findIndex( swag => swag.id == id );

    if(index !== -1){
        var newSwag = swag[index];
        user.cart.push(newSwag);
        user.total += newSwag.price;
    }

    res
    .status(200)
    .send(user);

}
var checkout = (req, res) => {
    var { user } = req.session;
    user.cart = [];
    user.total = [];

    res.status(200).send(user);

}

module.exports = {
    add,
    delete: (req, res) => {
        var { user } = req.session;
        var { id } = req.params;
        var index = user.cart.findIndex( swag => swag.id == id );
        var selectedSwag = swag.find(swag => swag.id == id);

        if(index !== -1){
            user.cart.splice(index, 1);
            user.total -= selectedSwag.price;
        }
        res
        .status(200)
        .send(user);
    },
    checkout
}
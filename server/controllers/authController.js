var users = require('../models/users');
var id = 1;

var login = (req, res) => {
    var { session } = req;
    var { username, password } = req.body;
    let user = users.find(
        (credentials) => {
            return (
                        username === credentials.username 
                        && 
                        password === credentials.password
                    );
        }
    );

    if(user){
        session.user.username = user.username;
        res.status(200).send(session.user);
    }else{
        res.sendStatus(500);
    }
    
}
var register = (req, res) => {
    var { username, password } = req.body;
    var { session } = req;
    var newUser = {
        id,
        username,
        password
    }

    users.push(newUser);
    id++;
    session.user.username = username;

    res
    .status(200)
    .send(session.user);

}
var signOut = (req, res) => {
    req.session.destroy();
    res
    .status(200)
    .send(req.session);
}
var getUser = (req, res) => {
    let { session } = req;
    res
    .status(200)
    .send(session.user)
}

module.exports = {
    login,
    register,
    signOut,
    getUser
}
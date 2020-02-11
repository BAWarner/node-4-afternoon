const express = require('express');
const session = require('express-session');
const app = express();

const dotenv = require('dotenv');
dotenv.config();
var { SERVER_PORT, SESSION_SECRET } = process.env;

var checkForSession = require('./middlewares/checkForSession');
var swagController = require('./controllers/swagController');
var authController = require('./controllers/authController');
var cartController = require('./controllers/cartController');
var searchController = require('./controllers/searchController');

let { read } = swagController;

let { login, signOut, register, getUser } = authController;
let { add, checkout } = cartController;
let { search } = searchController;

app.use(express.json());
app.use(
    session({
        secret: SESSION_SECRET,
        resave: true,
        saveUninitialized: true
    })
);
app.use(checkForSession);
app.use(express.static(`${__dirname}/../build)`));

app.listen(SERVER_PORT, () => console.log('Party on, Wayne!'));


app.get('/api/swag', read);

app.get('/api/user', getUser);
app.post('/api/login', login);
app.post('/api/signout', signOut);
app.post('/api/register', register);

app.post('/api/cart/checkout', checkout);
app.post('/api/cart/:id', add);
app.delete('/api/cart/:id', cartController.delete);

app.get('/api/search', search);
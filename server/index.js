var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var express = require('express');
var app = express();

// config files
mongoose.connect('mongodb://localhost/facebook');

// set port
var port = process.env.PORT || 9999;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../client'));
// require('./routes')(app);

// ========= ROUTES FOR OUR API =========
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:9999/api)
router.get('/', function(req, res) {
    res.json({ message: 'Test API!' });
});

// more routes for our API will happen here

// ========= REGISTER OUR ROUTES =========
// all of our routes will be prefixed with /api
app.use('/api', router);

// ========= START SERVER =========
app.listen(port);
console.log("Server listening on port ", port);

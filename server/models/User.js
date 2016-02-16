var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    firstname: {type : String, default: ''},
    lastname: {type : String, default: ''},
    address: {type : String, default: ''},
    password: {type : String, default: ''},
    email: {type : String, default: ''}
});

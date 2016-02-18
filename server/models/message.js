var mongoose = require('mongoose');

module.exports = mongoose.model('Message', {
    title: {
        type: String,
        default: ''
    },
    text: {
        type: String,
        default: ''
    }
});

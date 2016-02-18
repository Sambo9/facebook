var Message = require('../models/message');

module.exports = function(app) {

    app.get('/api/messages', function(req, res) {
        Message.find(function(err, messages) {
            (err ? res.send(err) : res.json(messages));
        });
    });

    app.post('/api/messages', function(req, res) {
        Message.create(req.body, function(err) {
            (err ? res.send(err) : res.status(200).send());
        });
    });

    app.delete('/api/messages/:id', function(req, res) {
        Message.remove({_id: req.params.id}, function(err) {
            (err ? res.send(err) : res.status(200).send());
        });
    });

};

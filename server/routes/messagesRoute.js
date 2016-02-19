var path = require('path');
var express = require('express')
var Message = require('../models/message');
var router = express.Router();



    router.get('/', function(req, res) {
        Message.find(function(err, messages) {
            (err ? res.send(err) : res.json(messages));
        });
    });

    router.post('/', function(req, res) {
        Message.create(req.body, function(err) {
            (err ? res.send(err) : res.status(200).send());
        });
    });

    router.delete('/:id', function(req, res) {
        Message.remove({_id: req.params.id}, function(err) {
            (err ? res.send(err) : res.status(200).send());
        });
    });

    router.get('*', function(req, res) {
        res.sendfile(path.resolve('../../client/index.html'));
    });


module.exports = router;

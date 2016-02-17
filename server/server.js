#!/usr/bin/env node

var debug = require('debug')('passport-mongo'),
    app = require('./app');


app.set('port', process.env.PORT || 9999);

var server = app.listen(app.get('port'), function() {
  console.log('Server listening on port ' + server.address().port);
});

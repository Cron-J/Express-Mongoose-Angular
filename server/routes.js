// Load modules

var User      = require('./controller/user'),
    Static    = require('./static');

// API Server Endpoints
module.exports = function(app){

	app.post('/user', User.create);

	app.get('/user', User.getAll);

	app.get('/user/:userid', User.getOne);

	app.put('/user/:userid', User.update);

	app.delete('/user/:userid', User.remove);

}
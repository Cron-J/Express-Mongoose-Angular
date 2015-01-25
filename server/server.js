var express = require('express'),
    Routes = require('./routes'),
    Db = require('./config/db'),
    config = require('./config/config');
    
var app = express();

app.use(express.static(__dirname + '/../client/src'));

// parse urlencoded request bodies into req.body
app.use(express.bodyParser())

require('./routes')(app);

var port = config.server.port;

app.listen(port);

console.log('Express app started on port ' + port);

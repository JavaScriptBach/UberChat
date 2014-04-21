var express = require("express");
var app = express();
var port = 3700;
 
// app.get("/", function(req, res){
//     res.send("It works!");
// });
app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("page");
});
app.use(express.static(__dirname + '/public'));
var io = require('socket.io').listen(app.listen(port));
var clientCount = 0;
io.sockets.on('connection', function (socket) {
	clientCount++;
	socket.emit('message', { message: 'Welcome to Uber Chat! ' + clientCount + ' currently connected.' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
	socket.on('disconnect', function() {
		clientCount--;
	});
});
console.log("Listening on port " + port);


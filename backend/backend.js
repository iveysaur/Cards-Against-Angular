var app = require('http').createServer(handler), io = require('socket.io').listen(app, { log: false }), fs = require('fs');
var url = require('url');
var questionList = require('./black'), responseList = require('./white');
var curquestion, responses = [], players = {}, ids = [], played = [];
var i, count = 0, round = 1, judge, current, next = 0;

app.listen(5700);

function handler (req, res) {
	var path = url.parse(req.url).pathname;
	if(path == '/')
		path = 'index.html';
	fs.readFile(__dirname + '/../' + path,
	function (err, data) {
		if (err) {
			res.writeHead(500);
			return res.end('Error loading index.html');
		}

		res.writeHead(200);
		res.end(data);
	});
}

function shuffle(array){
	var temp, random, cur = array.length;

	while(0 !== cur){
		random = Math.floor(Math.random() * cur);
		cur--;

		temp = array[cur];
		array[cur] = array[random];
		array[random] = temp;
	}
}

shuffle(questionList);
shuffle(responseList);

curquestion = questionList.pop();

io.sockets.on('connection', function(socket){
	socket.emit('question', curquestion);
	count++;
	console.log("round: " + round);
	players[socket.id] = { 'points': 0 };
	ids.push(socket.id);
	responses.push([]);
	for(i = 0; i < 7; i++){
		responses[responses.length - 1].push(responseList.pop());
	}
	socket.emit('player', responses[responses.length - 1]);
	socket.emit('id', socket.id);
	judge = ids[round%ids.length]; 
	console.log("judge: " + judge);
	io.sockets.emit('judge', 0);
	io.sockets.socket(judge).emit('judge', 1);
	socket.on('name', function(data){
		players[data.id].name = data.name;
	});
	socket.on('played', function(data){
		data.current = socket.id;
		console.log("played: " + data.player);
		played.push(data);
		socket.emit('new', responseList.pop());
		if(played.length == count - 1){
			shuffle(played);
			io.sockets.emit('playedlist', played);
		}
	});
	socket.on('winner', function(data){
		io.sockets.emit('losers', {data: data, name: players[data.player].name});
		players[data.player].points++;
		console.log("player " + players[data.player].name + " has " + players[data.player].points + " points");
		io.sockets.socket(data.player).emit('points', players[data.player].points);
	});
	socket.on('next', function(){
		next++;
		if(next == count){
			curquestion = questionList.pop();
			io.sockets.emit('question', curquestion);
			next = 0;
			played.length = 0;
			io.sockets.socket(judge).emit('judge', 0);
			round++;
			judge = ids[round%ids.length]; 
			io.sockets.socket(judge).emit('judge', 1);
		}
	socket.on('disconnect', function(data){
		count--;
	});
	console.log("count: " + count);
	console.log("id: " + socket.id);
});


var app = require('http').createServer(handler), io = require('socket.io').listen(app), fs = require('fs');
var url = require('url');
var questionList = require('./black'), responseList = require('./white');
var curquestion, responses = [], players = [];
var i, count = 0, judge = 0, judger, played = [];

app.listen(5700);

function handler (req, res) {
  fs.readFile(__dirname + '/../' + url.parse(req.url).pathname,
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
	judge++;
	players.push(socket.id);
	responses.push([]);
	for(i = 0; i < 7; i++){
		responses[responses.length - 1].push(responseList.pop());
	}
	socket.emit('player', responses[responses.length - 1]);
	judger = players[judge%players.length]; 
	io.sockets.emit('judge', 0);
	io.sockets.socket(judger).emit('judge', 1);
	socket.on('played', function(data){
		played.push(data);
		socket.emit('new', responseList.pop());
		if(played.length == count - 1){
			io.sockets.emit('playedlist', played);
		}
	});
	socket.on('disconnect', function(data){
		count--;
	});
	console.log("++count: " + count);
	console.log("++id: " + socket.id);
});


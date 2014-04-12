var app = require('http').createServer(handler), io = require('socket.io').listen(app), fs = require('fs');
var url = require('url');
var questionList = require('./black'), responseList = require('./white');
var curquestion, responses = [];
var i, count = 0, played = [];

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
	responses.push([]);
	for(i = 0; i < 7; i++){
		responses[responses.length - 1].push(responseList.pop());
	}
	socket.emit('player', responses[responses.length - 1]);
	socket.on('played', function(data){
		console.log(data);
		played.push(data);
		socket.emit('new', responseList.pop());
		socket.emit('playedlist', played);
	});
	count++;
	console.log("count: " + count);
});


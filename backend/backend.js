var app = require('http').createServer(handler), io = require('socket.io').listen(app), fs = require('fs');
var url = require('url');
var questionList = require('./black'), responseList = require('./white');
var curquestion, responses = [];
var i;

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
responses.push([]);
responses.push([]);
responses.push([]);
responses.push([]);

for(var j = 0; j < 4; j++){
	for(i = 0; i < 7; i++){
		responses[j].push(responseList.pop());
	}
}

io.sockets.on('connection', function(socket){
	socket.emit('question', curquestion);
	socket.emit('player1', responses[0]);
	socket.emit('player2', responses[1]);
	socket.emit('player3', responses[2]);
	socket.emit('player4', responses[3]);
	socket.on('played', function(data){
		console.log(data);
	});
});



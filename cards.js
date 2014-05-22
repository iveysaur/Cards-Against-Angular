var gameScope;

function GameCtrl($scope){
	// Question Card
	$scope.question = {};
	// Players' Cards
	$scope.responses = [];
	$scope.judge;
	$scope.already = 0;
	// Played cards
	$scope.played = [];
	// User
	$scope.id;
	$scope.name;
	$scope.winner;
	$scope.newbie = 1;
	$scope.submitted = 0;
	$scope.points = 0;

	// Submit name to server
	$scope.submit = function(){
		if($scope.name){
			$scope.newbie = 0;
			$scope.submitted = 1;
			socket.emit('name', {name: $scope.name, id: $scope.id});
		}
	};

	// Remove played card and send it to the server to hold
	$scope.remove = function(index){
		if($scope.responses.length == 7 && $scope.judge != 1 && $scope.already != 1){
			var played = {"card": $scope.responses[index], "player": $scope.id};
			$scope.responses.splice(index, 1);
			socket.emit('played', played);
			$scope.already = 1;
		}
	}

	// Send the chosen winning card to server
	$scope.choose = function(index){
		if($scope.judge == 1){
			$scope.played[index].index = index;
			socket.emit('winner', $scope.played[index]);
		}
	};

	// Tell the server to start the next round and reset the winner
	$scope.nextRound = function(){
		if($scope.winner){
			socket.emit('next');
			$scope.winner = "";
		}
	};

	// Have name box pop up
	$scope.change = function(){
		$scope.newbie = 1;
	};

	// When user decides they don't want to change their name make the box disappear
	$scope.nvm = function(){
		if($scope.name && $scope.submitted == 1)
			$scope.newbie = 0;
	};

	gameScope = $scope;
}

var socket = io.connect('http://' + window.location.host);
socket.on('question', function(data){
	gameScope.$apply(function(){
		gameScope.question = data;
		gameScope.played.length = 0;
		gameScope.already = 0;
	});
});
socket.on('player', function(data){
	gameScope.$apply(function(){
		gameScope.responses = data;
	});
});
socket.on('id', function(data){
	gameScope.$apply(function(){
		gameScope.id = data;
	});
});
socket.on('new', function(data){
	gameScope.$apply(function(){
		gameScope.responses.push(data);
	});
});
socket.on('playedlist', function(data){
	gameScope.$apply(function(){
		gameScope.played = data;
	});
});
socket.on('judge', function(data){
	gameScope.$apply(function(){
		gameScope.judge = data;
	});
});
socket.on('losers', function(data){
	gameScope.$apply(function(){
		for(i = 0; i < gameScope.played.length; i++){
			if(i != data.data.index)
				gameScope.played[i].lost = true;
		}
		gameScope.winner = data.name;
	});
});
socket.on('points', function(data){
	gameScope.$apply(function(){
		gameScope.points = data;
	});
});


var questionScope, responseScope, playedScope, idScope;

function QuestionCtrl($scope){
	$scope.question = {};

	questionScope = $scope;
}

function ResponseCtrl($scope){
	$scope.responses = [];
	$scope.judge;
	$scope.already = 0;

	$scope.remove = function(index){
		if($scope.responses.length == 7 && $scope.judge != 1 && $scope.already != 1){
			var played = {"card": $scope.responses[index], "player": idScope.id};
			$scope.responses.splice(index, 1);
			socket.emit('played', played);
			$scope.already = 1;
		}
	}

	responseScope = $scope;
}

function PlayedCtrl($scope){
	$scope.played = [];
	$scope.winner;

	$scope.choose = function(index){
		if(responseScope.judge == 1){
			$scope.played[index].index = index;
			socket.emit('winner', $scope.played[index]);
		}
	}

	playedScope = $scope;
}

function IDCtrl($scope){
	$scope.id;

	idScope = $scope;
}

var socket = io.connect('http://' + window.location.host);
socket.on('question', function(data){
	questionScope.$apply(function(){
		questionScope.question = data;
	});
});
socket.on('player', function(data){
	responseScope.$apply(function(){
		responseScope.responses = data;
	});
});
socket.on('id', function(data){
	idScope.$apply(function(){
		idScope.id = data;
	});
});
socket.on('new', function(data){
	responseScope.$apply(function(){
		responseScope.responses.push(data);
	});
});
socket.on('playedlist', function(data){
	playedScope.$apply(function(){
		playedScope.played = data;
	});
});
socket.on('judge', function(data){
	responseScope.$apply(function(){
		responseScope.judge = data;
	});
});
socket.on('losers', function(data){
	playedScope.$apply(function(){
		playedScope.winner = data.player;
		for(i = 0; i < playedScope.played.length; i++){
			if(i != data.index)
				playedScope.played[i].lost = true;
		}
	});
});


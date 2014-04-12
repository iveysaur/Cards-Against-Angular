var questionScope, responseScope, playedScope;

function QuestionCtrl($scope){
	$scope.question = {};

	questionScope = $scope;
}

function ResponseCtrl($scope){
	$scope.responses = [];
	$scope.judge;
	
	$scope.remove = function(index){
		if($scope.responses.length == 7){
			var played = $scope.responses[index];
			$scope.responses.splice(index, 1);
			socket.emit('played', played);
		}
	}

	responseScope = $scope;
}

function PlayedCtrl($scope){
	$scope.played = [];

	playedScope = $scope;
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


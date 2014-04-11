var questionScope, responseScope;

function QuestionCtrl($scope){
	$scope.question = {};

	questionScope = $scope;
}

function ResponseCtrl($scope){
	$scope.responses = [];
	
	$scope.remove = function(index, row){
		if($scope.responses[row].length == 7){
			var played = $scope.responses[row][index];
			$scope.responses[row].splice(index, 1);
			socket.emit('played', played);
		}
	}

	responseScope = $scope;

}

var socket = io.connect('http://' + window.location.host);
socket.on('question', function(data){
	console.log(data);
	socket.emit('my other news', {my: 'data'});
	questionScope.$apply(function(){
		questionScope.question = data;
	});
});
socket.on('player1', function(data){
	responseScope.$apply(function(){
		responseScope.responses.push(data);
	});
});
socket.on('player2', function(data){
	responseScope.$apply(function(){
		responseScope.responses.push(data);
	});
});
socket.on('player3', function(data){
	responseScope.$apply(function(){
		responseScope.responses.push(data);
	});
});
socket.on('player4', function(data){
	responseScope.$apply(function(){
		responseScope.responses.push(data);
	});
});


var questionScope, responseScope;

function QuestionCtrl($scope){
	$scope.question = {};

	questionScope = $scope;
}

function ResponseCtrl($scope){
	$scope.responses = [];
	
	$scope.remove = function(index){
		if($scope.responses.length == 7){
			var played = $scope.responses[index];
			$scope.responses.splice(index, 1);
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
socket.on('responses', function(data){
	responseScope.$apply(function(){
		responseScope.responses = data;
	});
});


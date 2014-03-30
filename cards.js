function QuestionCtrl($scope){
	$scope.questions = [
		{text:'Black Card 1'},
		{text:'Black Card 2'},
		{text:'Black Card 3'},
		{text:'Black Card 4'},
		{text:'Black Card 5'},
		{text:'Black Card 6'}];

	shuffle($scope.questions);

	$scope.remove = function(index){
		$scope.questions.splice(index, 1);
	}
}

function ResponseCtrl($scope){
	$scope.responses = [
		{text:'White Card 1'},
		{text:'White Card 2'},
		{text:'White Card 3'},
		{text:'White Card 4'},
		{text:'White Card 5'},
		{text:'White Card 6'}];
	
	shuffle($scope.responses);

	$scope.remove = function(index){
		$scope.responses.splice(index, 1);
	}
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


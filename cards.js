function QuestionCtrl($scope){
	$scope.questions = [
		{text:'Black Card 1', type:'black'},
		{text:'Black Card 2', type:'black'},
		{text:'Black Card 3', type:'black'},
		{text:'Black Card 4', type:'black'},
		{text:'Black Card 5', type:'black'},
		{text:'Black Card 6', type:'black'}];

	shuffle($scope.questions);
}

function ResponseCtrl($scope){
	$scope.responses = [
		{text:'White Card 1', type:'white'},
		{text:'White Card 2', type:'white'},
		{text:'White Card 3', type:'white'},
		{text:'White Card 4', type:'white'},
		{text:'White Card 5', type:'white'},
		{text:'White Card 6', type:'white'}];
	
	shuffle($scope.responses);
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


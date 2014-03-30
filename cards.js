function QuestionCtrl($scope){
	$scope.questions = [];

	shuffle($scope.questions);

	$scope.remove = function(index){
		$scope.questions.splice(index, 1);
		$scope.add();
	}

	$scope.add = function(){
		while($scope.questions.length < 6){
			$scope.questions.push(questionList.pop());
		}
	}

	$scope.add();
}

function ResponseCtrl($scope){
	$scope.responses = [];
	
	shuffle($scope.responses);

	$scope.remove = function(index){
		$scope.responses.splice(index, 1);
		$scope.add();
	}

	$scope.add = function(){
		while($scope.responses.length < 6){
			$scope.responses.push(responseList.pop());
		}
	}

	$scope.add();
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


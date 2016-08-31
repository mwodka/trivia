var questionBank = [{
	question: 'Question 1',
	answer1: '1',
	answer2: '2',
	answer3: '3',
	answer4: '4',
	solution: '1'
}, {
	question: 'Question 2',
	answer1: '11',
	answer2: '22',
	answer3: '33',
	answer4: '44',
	solution: '2'
}, {
	question: 'Question 3',
	answer1: '111',
	answer2: '222',
	answer3: '333',
	answer4: '444',
	solution: '3'
}];

var answersRight = 0;
var answersWrong = 0;
var answersTimedOut = 0;
var questionPosition = 0;
var timer = setTimeout(timeUp, 4000);

function checkAnswer(guess) {
	console.log(guess);
}

function createQuestion() {
	$('#question').html(questionBank[questionPosition].question);
	$('#q1').html(questionBank[questionPosition].answer1);
	$('#q2').html(questionBank[questionPosition].answer2);
	$('#q3').html(questionBank[questionPosition].answer3);
	$('#q4').html(questionBank[questionPosition].answer4);
}

function timeUp() {
	console.log("Time is up!");
	if (questionPosition < questionBank.length - 1) {
		timer = setTimeout(timeUp, 4000);
		questionPosition++;
		answersTimedOut++;
		createQuestion();
	} else {
		displayStats();
	}
}

function displayStats() {
	clearTimeout(timer);
	$('#right').html('Answers right: ' + answersRight);
	$('#wrong').html('Answers wrong: ' + answersWrong);
	$('#timeout').html('Unanswered: ' + answersTimedOut);
}

$(document).ready(function() {

	function createListeners() {
		
		$('#answers').click(function(e) {
			clearTimeout(timer);
			if (questionPosition < questionBank.length - 1) {
				timer = setTimeout(timeUp, 4000);
				questionPosition++;
				createQuestion();
				checkAnswer(this);
			} else {
				displayStats();
			}
			e.stopPropagation();
		});

		//debugging information
		$('*').click(function (e) {
    		document.title = e.target.tagName + '#' + e.target.id + '.' + e.target.className;
		});
	}
	createQuestion();
	createListeners();
});
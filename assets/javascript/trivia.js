var questionBank = [{
	question: 'CERN launched the very first website in what year?',
	answer1: '1975',
	answer2: '1980',
	answer3: '1985',
	answer4: '1990',
	solution: '2'
}, {
	question: 'The iPhone was released in what year?',
	answer1: '2004',
	answer2: '2005',
	answer3: '2006',
	answer4: '2007',
	solution: '4'
}, {
	question: 'With over 17 million units produced, what was the highest selling single model of personal computer ever?',
	answer1: 'TRS-80',
	answer2: 'Commodore 64',
	answer3: 'Apple II',
	answer4: 'Sinclair ZX Spectrum',
	solution: '2'
}];

var answersRight = 0;
var answersWrong = 0;
var answersTimedOut = 0;
var questionPosition = 0;
var time = 30;
var timer;
var seconds = time;
var timerIsRunning = false;

function startTimer(seconds) {
	//if (!timerIsRunning) {
		timer = setTimeout(timeUp, 1000 * seconds);
	//	timerIsRunning = true;
	//}
}

function restartTimer() {
	seconds = time;
	//timerIsRunning = false;
	clearTimeout(timer);
	startTimer(time);
}

function displayTime() {
	$('#timer').html(seconds);
}

function checkAnswer(guess) {
	console.log(guess);
	if (guess == questionBank[questionPosition].solution) {
		answersRight++;
	} else {
		answersWrong++;
	}
}

function createQuestion() {
	$('#question').html(questionBank[questionPosition].question);
	$('#a1').html(questionBank[questionPosition].answer1);
	$('#a2').html(questionBank[questionPosition].answer2);
	$('#a3').html(questionBank[questionPosition].answer3);
	$('#a4').html(questionBank[questionPosition].answer4);
}

function timeUp() {
	console.log("Time is up!");
	if (questionPosition < questionBank.length - 1) {
		questionPosition++;
		answersTimedOut++;
		restartTimer();
		createQuestion();
	} else {
		answersTimedOut++;
		displayStats();
	}
}

function displayStats() {
	$('#right').html('Answers right: ' + answersRight);
	$('#wrong').html('Answers wrong: ' + answersWrong);
	$('#timeout').html('Unanswered: ' + answersTimedOut);
}

function createListeners() {
	
	$('#a1').click(function(e) {
		clicked(1);
	});
	$('#a2').click(function(e) {
	clicked(2);
	});

	$('#a3').click(function(e) {
		clicked(3);
	});

	$('#a4').click(function(e) {
		clicked(4);
	});

	$('#btn').click(function(e) {
		restartGame();
	});

	//debugging information
	$('*').click(function (e) {
   		document.title = e.target.tagName + '#' + e.target.id + '.' + e.target.className;
	});
}

$(document).ready(function() {
	createListeners();
});

window.onload = function() {
	main();
}

function clicked(answer) {
	if (questionPosition < questionBank.length - 1) {
		checkAnswer(answer);
		restartTimer(time);
		questionPosition++;
		createQuestion();
	} else if (questionPosition === questionBank.length - 1) {
		checkAnswer(answer);
		questionPosition++;
		displayStats();
	} else {
		displayStats();
	}
}

function main() {
	$('#right').empty();
	$('#wrong').empty();
	$('#timeout').empty();
	createQuestion();
	createListeners();
	restartTimer(time);
	var timeInterval = setInterval(function () {
		displayTime();
		if (seconds > 0) {
			seconds--;
		}
	}, 1000);
}


function restartGame() {
	questionPosition = 0;
	answersRight = 0;
	answersWrong = 0;
	answersTimedOut = 0;
	main();
}
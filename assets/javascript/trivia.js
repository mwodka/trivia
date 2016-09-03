var qBank = [{
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
}, {
	question: 'What year was Facebook founded?',
	answer1: '2003',
	answer2: '2004',
	answer3: '2005',
	answer4: '2006',
	solution: '2'
}, {
	question: 'Who is credited with inventing the fist mechanical computer?',
	answer1: 'John von Neumann',
	answer2: 'Alan Turing',
	answer3: 'Richard Stallman',
	answer4: 'Charles Babbage',
	solution: '4'
}];

var answersRight = 0;
var answersWrong = 0;
var answersTimedOut = 0;
var qPosition = 0;
var time = 30;
var seconds = time;
var timer;
var timeIntervalID;

function startTimer(seconds) {
		timer = setTimeout(timeUp, 1000 * seconds);
}

function restartTimer() {
	clearTimeout(timer);
	startTimer(time);
}

function displayTime() {
	$('#timer').html(seconds);
}

function checkAnswer(guess) {
	console.log(guess);
	if (guess == qBank[qPosition].solution) {
		answersRight++;
		$('#correct-answer').html('Correct!');
		setTimeout(function() {
			$('#correct-answer').empty();
		}, 3000);

	} else {
		answersWrong++;
		$('#correct-answer').html('Incorrect. The answer was: ');
		displayAnswer();
	}
}

function displayAnswer() {
	var ans = qBank[qPosition].solution;
	if (ans === '1') {
		$('#correct-answer').append(qBank[qPosition].answer1);
	}
	else if (ans === '2') {
		$('#correct-answer').append(qBank[qPosition].answer2);
	}
	else if (ans === '3') {
		$('#correct-answer').append(qBank[qPosition].answer3);
	} else {
		$('#correct-answer').append(qBank[qPosition].answer4);
	}
	setTimeout(function() {
		$('#correct-answer').empty();
	}, 3000);
}

function createQuestion() {
	$('#question').html(qBank[qPosition].question);
	$('#a1').html(qBank[qPosition].answer1);
	$('#a2').html(qBank[qPosition].answer2);
	$('#a3').html(qBank[qPosition].answer3);
	$('#a4').html(qBank[qPosition].answer4);
}

function timeUp() {
	console.log("Time is up!");
	$('#correct-answer').html("Time is up! The answer was: ");
	displayAnswer();
	if (qPosition < qBank.length - 1) {
		qPosition++;
		answersTimedOut++;
		restartTimer();
		createQuestion();
		seconds = time;
	} else if (qPosition === qBank.length - 1) {
		answersTimedOut++;
		displayStats();
	} else {
		displayStats();
	}
}

function displayStats() {
	clearTimeout(timer);
	$('#right').html('Answers right: ' + answersRight);
	$('#wrong').html('Answers wrong: ' + answersWrong);
	$('#timeout').html('Unanswered: ' + answersTimedOut);
	gameOver();
}

function createListeners() {
	
	$('#a1').click(function() {
		clicked(1);
	});
	$('#a2').click(function() {
	clicked(2);
	});

	$('#a3').click(function() {
		clicked(3);
	});

	$('#a4').click(function() {
		clicked(4);
	});

	$('#btn').click(function() {
		restartGame();
	});
}

window.onload = function() {
	createListeners();
	main();
}

function clicked(answer) {
	if (qPosition < qBank.length - 1) {
		checkAnswer(answer);
		restartTimer();
		qPosition++;
		createQuestion();
		seconds = time;
	} else if (qPosition === qBank.length - 1) {
		checkAnswer(answer);
		qPosition++;
		displayStats();
		seconds = time;
	} else {
		displayStats();
	}
}

function main() {
	$('#right').empty();
	$('#wrong').empty();
	$('#timeout').empty();
	$('#correct-answer').empty();
	$('#game-over').empty();
	createQuestion();
	restartTimer();
	timeIntervalID = setInterval(function () {
		displayTime();
		if (seconds > 0) {
			seconds--;
		}
	}, 1000);
}


function restartGame() {
	qPosition = 0;
	answersRight = 0;
	answersWrong = 0;
	answersTimedOut = 0;
	seconds = time;
	clearInterval(timeIntervalID);
	main();
}

function gameOver() {
	$('#game-over').html('Game over! Press Restart to try again.');
}



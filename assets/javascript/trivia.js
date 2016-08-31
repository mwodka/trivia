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
var timer = new CountDownTimer(30);

function CountDownTimer(duration, granularity) {
	this.duration = duration;
	this.granularity = granularity || 1000;
	this.tickFtns = [];
	this.running = false;
}

CountDownTimer.prototype.start = function() {
	if (this.running) {
		return;
	}
	this.running = true;
	var start = Date.now(),
			that = this,
			diff, obj;

	(function timer() {
		diff = that.duration - (((Date.now() - start) / 1000) | 0);

		if (diff > 0) {
			setTimeout(timer, that.granularity);
		} else {
			diff = 0;
			that.running = false;
		}

		obj = CountDownTimer.parse(diff);

		that.tickFtns.forEach(function(ftn) {
			ftn.call(this, obj.minutes, obj.seconds);
		}, that);
	}());
};

CountDownTimer.prototype.restart = function (duration) {
	this.running = false;
	this.duration = duration;
	this.start();
};

CountDownTimer.prototype.onTick = function(ftn) {
	if (typeof ftn === 'function') {
		this.tickFtns.push(ftn);
	}
	return this;
};

CountDownTimer.prototype.expired = function() {
	return !this.running;
};

CountDownTimer.parse = function(seconds) {
	return {
		'minutes': (seconds / 60) | 0,
		'seconds': (seconds % 60) | 0
	};
};

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
		questionPosition++;
		answersTimedOut++;
		timer.restart(30);
		createQuestion();
	} else {
		answersTimedOut++;
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
			questionPosition++;
			if (questionPosition < questionBank.length) {
				timer = new CountDownTimer(30);
				timer.restart(30);
				createQuestion();
				checkAnswer(this);
			} else if (questionPosition === questionBank.length) {
				checkAnswer(this);
				displayStats();
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

function restart() {
	if (this.expired()) {
		setTimeout(function() {
			timeUp();
		}, 3000);
	}
}

function format(minutes, seconds) {
	minutes = minutes < 10 ? "0" + minutes : minutes;
	seconds = seconds < 10 ? "0" + seconds : seconds;
	$('#timer').html(minutes + ':' + seconds);
};

window.onload = function() {
	timer.onTick(format).onTick(restart).start();
}
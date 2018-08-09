// VARIABLES

var correct = 0;
var incorrect = 0;
var unanswered = 0;
var timeLeft = 20;
var intervalId;
var timerOn = false;
var clicked = false;

var questions = [
    {
        q: "Who is Pumba's best buddy?",
        a: ["Timone","Simba","Nala","Scar"],
        c: "Timone"
    },
    {
        q: "Who is Aladdin's love interest?",
        a: ["Mulan","Jasmine","Pocahontas","Cinderella"],
        c: "Jasmine"
    },
    {
        q: "What kind of creature is Shrek?",
        a: ["Dragon","Toad","Ogre","Wizard"],
        c: "Ogre"
    }
];

function timeUp() {
    $("#timer").html("<p>Time's up!</p>");
    $("#result").html("<strong>Where were you?</strong>");
    unanswered++;
    $("#no-answer").html("Unanswered: " + unanswered);
    $("#show-answer").html("The correct answer is: " + questions[qArrayPos].c);
    $("#answers").html("");
    stop();
    setTimeout(contentPrint, 3000);
    qArrayPos++;
    if (unanswered == questions.length) {
        endGame();
    }
}

function timer() {
    timerOn = false;
    timeLeft = 20;
    intervalId = setInterval(timeUp, 1000 * 20);
    setInterval(decrement, 1000);
}

function stop() {
    clearInterval(intervalId);
    timerOn = true;
    clicked = false;
}

function decrement() {
    if (!timerOn) {
        $("#timer").html("<p>Time remaining: " + timeLeft);
        timeLeft--;
        if (timeLeft == 0) {
            timeUp();
        }
    }
}

var qArrayPos = 0;
var correctAnswer;
var playerAnswer;

function contentPrint() {
    if (correct + incorrect + unanswered < questions.length) {
        timer();
        $("#timer").html("<p>Time remaining: " + timeLeft);
        $("#right").html("Correct: " + correct);
        $("#wrong").html("Incorrect: " + incorrect);
        $("#no-answer").html("Unanswered: " + unanswered);
        $("#show-answer").html("");
        $("#result").html("");
        $("#question").html("<h3>" + questions[qArrayPos].q + "</h3>");
        $("#answers").html("");
        for (var i = 0; i < questions[qArrayPos].a.length; i++) {
            $("#answers").append("<p id='answer" + i + "' class='ans'>" + questions[qArrayPos].a[i] + "</p>");
        }
    } else if (correct + incorrect + unanswered == questions.length) {
        endGame();
    }
}

function rightAnswer() {
    $("#result").html("<strong>You're right!</strong>");
    correct++;
    $("#right").html("Correct: " + correct);
    $("#show-answer").html("The correct answer is: " + questions[qArrayPos].c);
    $("#answers").html("");
    $("#timer").html("");
    qArrayPos++;
    stop();
}

function wrongAnswer() {
    $("#result").html("<strong>You're wrong!</strong>");
    incorrect++;
    $("#wrong").html("Incorrect: " + incorrect);
    $("#show-answer").html("The correct answer is: " + questions[qArrayPos].c);
    $("#answers").html("");
    $("#timer").html("");
    qArrayPos++;
    stop();
}

function endGame() {
    $("#timer").html("");
    $("#result").html("");
    $("#show-answer").html("");
    $("#question").html("");
    $("#answers").html("");
    $("#right").html("");
    $("#wrong").html("");
    $("#no-answer").html("");
    $("#restart").html("<button type='button' class='btn btn-success start'>Restart Game</button>");
    stop();
    qArrayPos = 0;
}

// GAME

$(".start").on("click", function() {
    $(".start").remove();
    contentPrint();
});

$("#answers").on("click", ".ans", function() { // .ans is child of the div // event delegation
    var playerAnswer = $(this).html();

    if (playerAnswer === questions[qArrayPos].c) {
        rightAnswer();
        setTimeout(contentPrint, 3000);
    } else {
        wrongAnswer();
        setTimeout(contentPrint, 3000);
    }

    clicked = true;
})

$("#restart").on("click", function() {
    $("#restart").remove();
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    $("#right").html("");
    $("#wrong").html("");
    $("#no-answer").html("");
    contentPrint();
});


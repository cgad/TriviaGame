// VARIABLES

var correct = 0;
var incorrect = 0;
var unanswered = 0;
var timeLeft = 30;
var intervalId;
var counter;
var timerOn = false;
var userClick = false;

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


// FUNCTIONS

function hideButton() {
    $(".start").remove();
}

function timeUp() {
    $("#timer").html("<p>Time's up!</p>");
}

function timer() {
    intervalId = setInterval(timeUp, 1000 * 30);
    setInterval(decrement, 1000);
}

function stop() {
    clearInterval(intervalId);
    timerOn = true;
}

function decrement() {
    if (!timerOn) {
        $("#timer").html("<p>Time remaining: " + timeLeft);
        timeLeft--;
        if (timeLeft == 0) {
            stop();
            timeUp();
        }
        if (userClick == true) {
            stop();
        }
    }
}


// GAME

$(".start").on("click",function () {
    hideButton();
    timer();
    $("#question").html("<h3>" + questions[0].q + "</h3>"); // CHANGE HARD CODE
    for (var i = 0; i < questions[0].a.length; i++) {
        $("#answers").append("<p>" + questions[0].a[i] + "</p>");
    }
});

// var correctAnswer;
// var playerAnswer;
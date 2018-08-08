// VARIABLES

var correct = 0;
var incorrect = 0;
var unanswered = 0;
var timeLeft = 30;
var intervalId;
var timerOn = false;

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
    $("#result").html("<strong>Where were you?</strong>");
    stop();
}

function timer() {
    timerOn = false;
    timeLeft = 30;
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
            timeUp();
        }
    }
}

var qArrayPos = 0;
var correctAnswer;
var playerAnswer;

function contentPrint() {
    timer();
    $("#timer").html("<p>Time remaining: " + timeLeft);
    $("#show-answer").html("");
    $("#question").html("<h3>" + questions[qArrayPos].q + "</h3>"); // CHANGE HARD CODE
    $("#answers").html("");
    for (var i = 0; i < questions[qArrayPos].a.length; i++) {
        $("#answers").append("<p id='answer" + i + "' class='ans'>" + questions[qArrayPos].a[i] + "</p>");
    }
}

function rightAnswer() {
    $("#result").html("<strong>You're right!</strong>");
    correct++;
    $("#right").text(correct);
    $("#show-answer").html("The correct answer is: " + questions[qArrayPos].c);
    qArrayPos++;
    stop();
}

function wrongAnswer() {
    $("#result").html("<strong>You're wrong!</strong>");
    incorrect++;
    $("#wrong").text(incorrect);
    $("#show-answer").html("The correct answer is: " + questions[qArrayPos].c);
    qArrayPos++;
    stop();
}

// GAME


$(".start").on("click", function() {
    hideButton();
    contentPrint();
});

$("#answers").on("click", ".ans", function() { // .ans is child of the div // event delegation
    var playerAnswer = $(this).html();
    console.log(playerAnswer);
    console.log(questions[qArrayPos].c);
    if (playerAnswer === questions[qArrayPos].c) {
        rightAnswer();
        setTimeout(contentPrint, 5000);
    } else {
        wrongAnswer();
        setTimeout(contentPrint, 5000);
    }
    // if (timeUp()) {
        
    // }
})
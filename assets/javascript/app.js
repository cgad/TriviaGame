// VARIABLES

var correct = 0;
var incorrect = 0;
var unanswered = 0;
var timeLeft = 20;
var intervalId;
// var timerOn = false;
// var timerId;
var qArrayPos = 0;
var playerAnswer;

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

function timer() {
    // timeLeft = 20;
    clearInterval(intervalId);
    // timerOn = false;
    intervalId = setInterval(decrement, 1000);
}

function stop() {
    clearInterval(intervalId);
    // timerOn = true;
}

function decrement() {
    // clearInterval(timerId);
    // timerId = setInterval(decrement, 1000);
    // if (!timerOn) {
        timeLeft--;
        $("#timer").html("<p>Time remaining: " + timeLeft + " seconds");
        if (timeLeft === 0) {
            stop();
            $("#timer").html("<strong>Time's up!</strong>");
            $("#show-answer").html("The correct answer is: " + questions[qArrayPos].c);
            // reset timeleft each time it = 0
            timeLeft = 20;
            setTimeout(contentPrint, 3000);
            qArrayPos++;
            unanswered++;
            $("#no-answer").html("Unanswered: " + unanswered);
            $("#answers").html(""); 
        }
    // }
}

function contentPrint() {
    if (correct + incorrect + unanswered < questions.length) {
        // add initial time to html initially because it delays showing up by 1 second
        // to make it show at 20...
        $("#timer").html("<p>Time remaining: " + timeLeft + " seconds");
        // then calling timer() makes it show at 19, 18 etc.
        timer();
        $("#right").html("Correct: " + correct);
        $("#wrong").html("Incorrect: " + incorrect);
        $("#no-answer").html("Unanswered: " + unanswered);
        $("#show-answer").html("");
        $("#result").html("");
        $("#question").html("<h4>" + questions[qArrayPos].q + "</h4>");
        $("#answers").html("");
        for (var i = 0; i < questions[qArrayPos].a.length; i++) {
            $("#answers").append("<p id='answer" + i + "' class='ans'><strong>" + questions[qArrayPos].a[i] + "</strong></p>");
        }
    } else if (correct + incorrect + unanswered === questions.length) {
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
    // stop();
    // reset timeleft each time it = 0
    timeLeft = 20;
    setTimeout(contentPrint, 3000);
}

function wrongAnswer() {
    $("#result").html("<strong>You're wrong!</strong>");
    incorrect++;
    $("#wrong").html("Incorrect: " + incorrect);
    $("#show-answer").html("The correct answer is: " + questions[qArrayPos].c);
    $("#answers").html("");
    $("#timer").html("");
    qArrayPos++;
    // stop();
    // reset timeleft each time it = 0
    timeLeft = 20;
    setTimeout(contentPrint, 3000);
}

function endGame() {
    $("#timer").html("");
    $("#result").html("");
    $("#show-answer").html("");
    $("#question").html("");
    $("#answers").html("");
    $("#previous").html("<p></p><h5>Your previous score was</h5>");
    // $("#right").html("");
    // $("#wrong").html("");
    // $("#no-answer").html("");
    $("#restart").html("<p></p><button type='button' class='btn btn-success start'>Restart Game</button>");
    stop();
    qArrayPos = 0;
}

// GAME

$(".start").on("click", function() {
    $(".start").remove();
    contentPrint();
})

$("#answers").on("click", ".ans", function() { // .ans is child of the div // event delegation
    var playerAnswer = $(this).html();
    stop();
    if (playerAnswer === questions[qArrayPos].c) {
        rightAnswer();
    } else {
        wrongAnswer();      
    }
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
})


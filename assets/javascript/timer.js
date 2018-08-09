var number = 20;
var intervalId;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var qArrayPos = 0;
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

function run() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
}

function decrement() {
    $("#timer").html("Time remaining: " + number + " seconds");
    number--;
    if (number === 0) {
        stop();
        $("#timer").html("<strong>Time's up!</strong>");
        unanswered++;

        // TO DO
        // hide answers or make them unclickable
        // display correct answer
    }
    qArrayPos++;
}

function stop() {
    clearInterval(intervalId);
}

// for initial start and restart
function pageSetup() {
    // reset scoreboard
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    qArrayPos = 0;
    $("#right").html("Correct: " + correct);
    $("#wrong").html("Incorrect: " + incorrect);
    $("#no-answer").html("Unanswered: " + unanswered);

    // clear question, result, answer
    
}

function game() {
    // display scoreboard
    $("#right").html("Correct: " + correct);
    $("#wrong").html("Incorrect: " + incorrect);
    $("#no-answer").html("Unanswered: " + unanswered);

    // if there are still questions left...
        // start timer
        // display question and answers
    if (correct + incorrect + unanswered < questions.length) {
        run();

        $("#question").html("");
        $("#question").html("<h3>" + questions[qArrayPos].q + "</h3>");

        $("#answers").html("");
        for (var i = 0; i < questions[qArrayPos].a.length; i++) {
            $("#answers").append("<p id='answer" + i + "' class='ans'>" + questions[qArrayPos].a[i] + "</p>");
        }

    } else if (correct + incorrect + unanswered === questions.length) {
        endGame();
    }
}

function endGame() {
    // reset scoreboard and array counter
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    qArrayPos = 0;

    // stop timer
    stop();

    // page clear
    $("#timer").clear();
    $("#result").clear();
    $("#show-answer").clear();
    $("#question").clear();
    $("#answers").clear();
    $("#right").clear();
    $("#wrong").clear();
    $("#no-answer").clear();

    // show restart button
    $("#restart").html("<button type='button' class='btn btn-success start'>Restart Game</button>");
}

function rightAnswer() {
    $("#result").html("<strong>You're right!</strong>");
    correct++;
    $("#right").html("Correct: " + correct);
    $("#show-answer").html("The correct answer is: " + questions[qArrayPos].c);
    $("#answers").clear();
    $("#timer").clear();
    qArrayPos++;
}

function wrongAnswer() {
    $("#result").html("<strong>You're wrong!</strong>");
    incorrect++;
    $("#wrong").html("Incorrect: " + incorrect);
    $("#show-answer").html("The correct answer is: " + questions[qArrayPos].c);
    $("#answers").clear();
    $("#timer").clear();
    qArrayPos++;
    setTimeout(game, 3000);
}

$(".start").on("click", function () {
    run();
    $(".start").remove();

    pageSetup();
    game();
})

$("#answers").on("click", ".ans", function() {
    console.log("hi");
    stop();

    var playerAnswer = $(this).html();
    if (playerAnswer === questions[qArrayPos].c) {
        rightAnswer();
        setTimeout(game, 3000);
    } else {
        wrongAnswer();    
        setTimeout(game, 3000); 
    }
})

$("#restart").on("click", function() {
    run();
    $("#restart").remove();

    pageSetup();
    game();
})
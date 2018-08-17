// VARIABLES

var correct = 0;
var incorrect = 0;
var unanswered = 0;
var timeLeft = 20;
var intervalId;
var qArrayPos = 0;
var playerAnswer;

var questions = [
    {
        q: 'In "The Lion King", who is the best buddy of Pumba?',
        a: ["Timone","Simba","Nala","Scar"],
        c: "Timone"
    },
    {
        q: 'In "Aladdin", who is the love interest of Aladdin?',
        a: ["Mulan","Jasmine","Pocahontas","Cinderella"],
        c: "Jasmine"
    },
    {
        q: 'In "Tarzan," what kind of creature is Tarzan?',
        a: ["Chimpanzee","Ape","Bonobo","Human"],
        c: "Human"
    },
    {
        q: 'In "Cinderella", which glass slipper did Cinderella leave at the ball?',
        a: ["Left","Right","Both","Neither"],
        c: "Left"
    },
    {
        q: 'Which of these Disney "Princesses" is an actual princess?',
        a: ["Moana","Mulan","Elsa","Pocahontas"],
        c: "Elsa"
    },
    {
        q: 'In "Mulan", what must we be as swift as?',
        a: ["A great typhoon","A coursing river","A raging fire","a lion on the prowl"],
        c: "A coursing river"
    }
];

// FUNCTIONS

function timer() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
}

function stop() {
    clearInterval(intervalId);
}

function decrement() {
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
            $("#answers").append("<p id='answer" + i + "' class='ans'>" + questions[qArrayPos].a[i] + "</p>");
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
    $("#previous").html("<p></p><h6>Your previous score was:</h6>");
    $("#restart").html("<p></p><button type='button' class='btn btn-success start'>Restart Game</button>");
    stop();
    qArrayPos = 0;
}

// GAME

$(".start").on("click", function() {
    $(".start").remove();
    contentPrint();
    console.log(questions[qArrayPos].c);
})

$("#answers").on("click", ".ans", function() {
    var playerAnswer = $(this).html();
    stop();
    console.log(playerAnswer);
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


// number counter
// starts at 21 because delays 1 second before displaying time remaining
var number = 21;

// variable that will hold our interval ID when we execute the "run" function
var intervalId;

// when an answer (with class ans rather than entire div) is clicked, stop timer
$("#answers").on("click", "ans", function() {
    stop();

    // TO DO
    // hide answers or make them unclickable
    // display correct answer
})

// on start button click, start timer and remove button
$(".start").on("click", function () {
    run();
    $(".start").remove();

    // TO DO
    // display question, answer choices
})

function run() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
}

// decrement function to count down
function decrement() {

    // decrease number by one.
    number--;

    // show the time remaining in timer div
    $("#timer").html("Time remaining: " + number + " seconds");


    // once number hits zero...
    if (number === 0) {

        // ...run the stop function.
        stop();

        // replace time remaining in timer div w/ time's up message
        $("#timer").html("Time's up!");

        // TO DO
        // hide answers or make them unclickable
        // display correct answer
    }
}

// stop timer function
function stop() {

    // clears intervalId to stop the time from decrementing
    clearInterval(intervalId);
}
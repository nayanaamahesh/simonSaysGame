var buttonColours = ["red", "blue", "green", "yellow"];

var sequence = [];
var userClickedPattern = [];

var gameStart = false;
var level = 0;

$(document).keypress(function () {
    if(!gameStart) {
        $("#level-title").text("Level " + level);
        nextSequence();
        gameStart = true;
    }
})

$(".btn").click(function () {
    var userClicked = $(this).attr("id");
    userClickedPattern.push(userClicked);

    animatePress(userClicked);

    checkAnswer(userClickedPattern.length - 1);
})

function checkAnswer(currentLevel) {
    if (sequence[currentLevel] === userClickedPattern[currentLevel]) {
        if(userClickedPattern.length === sequence.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        },200);

        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);

    var randomNum = Math.floor(Math.random() * 4);
    var randomColour = buttonColours[randomNum];
    sequence.push(randomColour);

    $("#" + randomColour).fadeIn(100).fadeOut(100).fadeIn(100);
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    sequence = [];
    gameStart = false;
}
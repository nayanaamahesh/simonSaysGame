var sequence = [];
$(document).on("keypress", function(){
    start();
})

function start() {
    sequence = [];
    randomSquare();
    turn(0);

}
function turn(index) {
    if (index >= sequence.length) {
        console.log("done" + sequence);
        randomSquare();
        turn(0);  // Start a new turn
    } else {
        click(index, function(newIndex) {
            turn(newIndex);  // Continue the current turn with the next index
        });
    }
}


function gameOver() {
    console.log("gameover");
    $("h1").text("Game Over");
    

}
function click(index, callback) {
    console.log(index);
    $("button").one("click", function(event) {  // Use 'one' to ensure the handler is only called once per click
        console.log(this);
        console.log(index);
        var correct = "." + numberToSquare(sequence[index]);

        var curr = "." + this.classList[0];
        var isCorrect = (curr == correct);
        $(curr).addClass("clicked");
        console.log("clicked" + curr + " " +sequence);
        setTimeout(function() {
            $(curr).removeClass("clicked");
        }, 100);

        if (!isCorrect) {
            console.log(curr);
            console.log(correct);
            gameOver();
        } else {
            if (index + 1 < sequence.length){
                index++
                console.log("continue" + sequence);
                callback(index);  // Call the callback with the updated index
            } else {
                console.log("end" + curr);
                $(curr).off("click");

                randomSquare();
                turn(0);
            }
            
        }
    });
}


function randomSquare() {
    var randomNumber = Math.floor(Math.random() * 4) + 1;
    sequence.push(randomNumber);
    onClick(randomNumber);
    $("h1").text(sequence);
    return randomNumber;
    
    
}

function onClick(square) {
    activeButton = "";
    switch (square) {
        case 1:
            activeButton = ".green";
            $(activeButton).addClass("clicked");
            break;
        case 2:
            activeButton = ".red";
            $(activeButton).addClass("clicked");
            break;
        case 3:
            activeButton = ".yellow";
            $(activeButton).addClass("clicked");
            break;
        case 4:
            activeButton = ".blue";
            $(activeButton).addClass("clicked");
            break;
        default:
            break;
    }
    setTimeout(function() {
        $(activeButton).removeClass("clicked");
    },100)
    return square;
}

function numberToSquare(number) {
    switch (number) {
        case 1:
            return "green";
            
        case 2:
            return "red";

        case 3:
            return "yellow";

        case 4:
            return "blue";
        default:
            break;
    }
}

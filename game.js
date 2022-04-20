// VARIABLES

// stores an array of the random moves the game chooses
var gamePattern = [];

// stores an array of the player's moves
var userClickedPattern = [];

// tracks the current level
var level = 0;

// tracks if the game is currently in progress
var started = false;

// the list of button colors
var buttonColors = ["red", "blue", "green", "yellow"]


// EVENT HANDLERS

// listens for any kepress in the entire document/page
$(document).keydown(function() {
  if (!started) {
    started = true;
    setTimeout(function() {
      nextSequence();
    }, 300);
  }
});

// listens for when any of the 4 buttons are selected
$(".btn").click(function() {
  // if game has not started, run nextSequence() which begins the game
  if (!started) {
    started = true;
    setTimeout(function() {
      nextSequence();
    }, 300);
  } else{
    // if game has started, check the user's chosen color against the game's current color
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  }
  });


// FUNCTIONS

// main function that begins the game and repeats when each level begins
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.round(Math.random() * 3);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

// checks the color of what the player chose with the color that the game chose
function checkAnswer(level) {
  // if the players chosen color in the sequence matches the games color stored in the array, gamePattern
  if (userClickedPattern[level] === gamePattern[level]) {
    // if the player's array is the same number of colors as the game's
    if (userClickedPattern.length === gamePattern.length) {
      console.log("success");
      setTimeout(function() {
        nextSequence();
      }, 1500)
    }
    // if the player's move does NOT match the game's color in the sequence
  } else {
    console.log("Wrong")
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key or Button to Restart");
    startOver();
  }
}

// function the restarts the game after it's ended
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// automates animation when a button is pressed
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100)
}

// automates playing the sound which corresponds with the color of the button that's pressed
function playSound(name) {
  var gameAudio = new Audio("sounds/" + name + ".mp3");
  gameAudio.play();
}

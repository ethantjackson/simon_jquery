var gamePattern = [];
var userClickedPattern = [];
var patternNum = 0;
var level = 0;

var buttonColors = ["red", "blue", "green", "yellow"];
for (var i = 0; i < 4; ++i) {
  $("." + buttonColors[i]).click(function(e) {
    userClickedPattern.push(e.target.id);
    animatePress(e.target.id);
    playSound(e.target.id);
    checkSequence();
  });
}

$(document).on("keydown", function() {
  if (level === 0) {
    nextSequence();
    $("h1").text("Level 1");
  }
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("." + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  ++level;
  $("h1").text("Level " + level);
  userClickedPattern = [];
}

function animatePress(targetColor) {
  $("." + targetColor).addClass("pressed");
  setTimeout(function() {
    $("." + targetColor).removeClass("pressed");
  }, 100);
}

function playSound(targetColor) {
  var audio = new Audio("sounds/" + targetColor + ".mp3");
  audio.play();
}

function checkSequence() {
  if (gamePattern.length === 0 || userClickedPattern[patternNum] !== gamePattern[patternNum]) {
    gameOver();
  } else {
    ++patternNum;
    if (patternNum >= gamePattern.length) {
      patternNum = 0;
      setTimeout(function() {
        nextSequence();
      }, 750);
    }
  }
}

function gameOver() {
  gamePattern = [];
  userClickedPattern = [];
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  level = 0;
  $("h1").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
}

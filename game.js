var gamePattern=[];
var userClickedPattern=[];
var buttonColour=["red","blue","green","yellow"];

var level=0;
var started=false;

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextsequence();
      started = true;
    }
  });
  


$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatepress(userChosenColour);
    playsound(userClickedPattern);
    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextsequence();
        }, 1000);
      }
    } else {
      playsound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}
function nextsequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("level "+level);
    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColour=buttonColour[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playsound(randomChosenColour);
  
}


function playsound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatepress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }
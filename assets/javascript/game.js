// Global Variables section
//___________________________________________________________________
// Tech Company names
var TechCompany = ["apple", "samsung", "microsoft", "alphabet", "intel", "ibm", "facebook","tencent", "oracle"];
var nextWord = "";  //word being guessed
var letters = [];     //letters in word
var blanksNum = 0;    //calculate the number of blanks left based on number of letters left in word
var currentGuess = [];// correct + blanks
var wrongLetters = [];//incorrect guesses

var guessesWrong = 0;
var guessesLeft = 0;
var numWins = 0;
var numLosses = 0;


//___________________________________________________________________
// Functions section
//___________________________________________________________________

function startgame() {
    //reset counters
    guessesLeft = 10;
    wrongLetters = [];
    currentGuess = [];

    //Get next random word
    nextWord = TechCompany [Math.floor(Math.random() * TechCompany.length)];
    console.log ("nextWord" + nextWord);
    console.log ("currentGuess" + currentGuess);
    //split up word into letters
    letters = nextWord.split("");


    //initialize blanks counter to max letters in word
    blanksNum = letters.length;
    console.log(blanksNum);

    //reset current guess
    currentGuess = [];

    // Get total blanks for word on line
    for (var i=0; i<blanksNum; i++) {
        currentGuess.push("_ ");
    } 
    //mySound = new sound("youwon.mp3");

    // Put on HTML page blank spaces and counters
    document.getElementById("wordGuess").innerHTML = currentGuess.join(" ");
    document.getElementById("numguesses").innerHTML = guessesLeft;
    document.getElementById("Wins").innerHTML = numWins;
    document.getElementById("Losses").innerHTML= numLosses;
}

function checkLetter(letter) {
    var letterflag = false;
    for (var i=0; i<blanksNum; i++) {
        if (nextWord[i] == letter) {
            letterflag = true;
            currentGuess[i] = letter;
            document.getElementById("wordGuess").innerHTML = currentGuess.join(" ");
            console.log (" update currentGuess" + currentGuess);
        }
    }
    if (!letterflag){
        guessesLeft--;
        guessesWrong++;
        wrongLetters.push(letter);
    }
}

function gameOver() {

    // Update HTML stats
    document.getElementById("numguesses").innerHTML = guessesLeft;
    document.getElementById("wordGuess").innerHTML = currentGuess.join(" "); // why isn't last letter showing?
    document.getElementById("wrong").innerHTML = wrongLetters.join(" ");

    //check if won game
    if (letters.toString() == currentGuess.toString()) {
//       mySound.play();
 //      document.getElementById("wordGuess").innerHTML = currentGuess.join(" ");
        numWins++;
        document.getElementById("Wins").innerHTML = numWins;
        alert("You WON!!");

        startgame();
    }

    //check if lost
    else if (guessesLeft == 0) {
        numLosses++;
        alert("You LOST");
        document.getElementById("Losses").innerHTML = numLosses;
        startgame();
    }

}

//function sound(src) {
  //  this.sound = document.createElement("audio");
    ///this.sound.src = src;
    //this.sound.setAttribute("preload", "auto");
    //this.sound.setAttribute("controls", "none");
    //this.sound.style.display = "none";
    //document.body.appendChild(this.sound);
    //this.play = function(){
      //  this.sound.play();
    //}
    //this.stop = function(){
      //  this.sound.pause();
   // }//
//}
//___________________________________________________________________
//Main Code section
//___________________________________________________________________

startgame();
alert ("Press any key to get started");
// Get keypress
document.onkeyup = function(event) {
    var letterPicked = String.fromCharCode(event.keyCode).toLowerCase(); 
    checkLetter (letterPicked);
    gameOver();
}


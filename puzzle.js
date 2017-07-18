var puzzle = []; //Array to store gameboard
var blank = []; //Array to store empty pieces location
var moves = 0;
//Function to track time elapsed since last shuffle
function timer() {
	timer = setInterval(function() {
		seconds++;
		document.getElementById("timer").innerText = seconds;
	}, 1000);
}
//Function to restart the timer
function resetTimer() {
	seconds = 0;
	timer();
}
//Function to completely reload game
function reset() {
	location.reload();
}
//Load the elements of the puzzle into the puzzle array when the page is loaded
window.onload = function() {
	puzzle = $$("#gameboard div"); //Set puzzle[] to the div's inside of the gameboard
	var row = 0;
	var right = 0;
	var top = 0;
	for (var i = 0; i < puzzle.length; i++) {
		puzzle[i].addClassName("puzzlepiece"); //mark divs as puzzlepiece class
		puzzle[i].style.float = "left";
		puzzle[i].style.backgroundSize = "400px 400px";

		blank[i] = []; //Fill blank[] with empty []'s
		blank[i][0] = right;
		blank[i][1] = top;

		puzzle[i].style.backgroundPosition = "-" + blank[i][0] + "px -" + blank[i][1] + "px"; //Properly displace background image
		row++;
		if (row === 4) { //Track which row is being displayed
			top += 100;
			right = 0;
			row = 0;
		} else {
			right += 100;
		}
	}

	var freemove = document.createElement("div"); //Create piece #16 and add it to the gameboard 
	$("gameboard").appendChild(freemove);
	blankP(freemove);
	puzzle = $$("#gameboard div"); // updated array with piece 16    
	movepiece();
};

//Function to change a moveable piece into a blank piece
var blankP = function(bSpace) {
	bSpace.removeClassName("movablepiece");
	bSpace.addClassName("puzzlepiece");
	bSpace.style.float = "left";
	bSpace.style.backgroundImage = "none"; //blank tile
	bSpace.style.border = "2px solid white";   //White border to appear invisible
};

//Function to properly display the background image
var background_Position = function(piece, item) {
	piece.style.backgroundPosition = "-" + blank[item - 1][0] + "px -" + blank[item - 1][1] + "px";
};

//Function to apply the background image to the pieces
var regularP = function(p) {
	p.addClassName("puzzlepiece");
	p.style.border = "2px solid black";
	p.style.backgroundImage = "url(background.jpg)";
	p.style.backgroundSize = "400px 400px";
};

//Function to shuffle puzzle as many times as the user wants
function shufflePuzzle() {
	var numArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
	for (var i = puzzle.length; i > 0; i) {
		var j = Math.floor(Math.random() * i);
		var x = numArray[--i];
		var test = numArray[j];
		if (test == "0") {
			puzzle[i].addClassName("puzzlepiece");
			blankP(puzzle[i]);
			puzzle[i].innerHTML = "";
		} else {
			puzzle[i].innerHTML = numArray[j];
			regularP(puzzle[i]);
			background_Position(puzzle[i], test);
		}
		numArray[j] = x;
	}
	moves = 0; //Reset moves after the board is shuffled
	document.getElementById("counter").innerHTML = (moves); //Print the current moves
	mopiece(); 
	resetTimer(); //Restart the timer that was running for the previous shuffle
}

//Function to add the movable piece class to a piece that is movable (for styling)
var movePA = function(piece) {
	puzzle[piece].addClassName("movablepiece");
};

//Function to relocate piece
var movepiece = function() {
	var move = this.innerHTML;
	var can_move = this.hasClassName('movablepiece');  //boolean to see if current element is actually movable
	var blank = 0;
	if (can_move) {    //if yes, move piece
		for (var i = 0; i < puzzle.length; i++) {
			blank = puzzle[i].innerHTML;
			if (puzzle[i].innerHTML == "") {
				puzzle[i].innerHTML = move;
				this.innerHTML = blank;
				regularP(puzzle[i]);
				blankP(this);
				mopiece();
				background_Position(puzzle[i], move);
			}
		}
	}
	moves++;   //increment moves
	document.getElementById("counter").innerHTML = (moves);    //display moves
};


//Function to locate movable peices and label them
var mopiece = function() {
	for (var i = 0; i < puzzle.length; i++) {
		puzzle[i].removeClassName("movablepiece");
	}
	for (var i = 0; i < puzzle.length; i++) {
		if (puzzle[i].innerHTML == "") {
			puzzle[i].removeClassName("movablepiece");

			switch (i) {
				case 0:
					movePA(i + 1);
					movePA(i + 4);
					break;
				case 1:
				case 2:
					movePA(i - 1);
					movePA(i + 1);
					movePA(i + 4);
					break;
				case 3:
					movePA(i - 1);
					movePA(i + 4);
					break;
				case 4:
					movePA(i - 4);
					movePA(i + 4);
					movePA(i + 1);
					break;
				case 5:
				case 6:
				case 9:
				case 10:
					movePA(i - 4);
					movePA(i + 4);
					movePA(i + 1);
					movePA(i - 1);
					break;
				case 7:
				case 11:
					movePA(i - 4);
					movePA(i + 4);
					movePA(i - 1);
					break;
				case 8:
					movePA(i - 4);
					movePA(i + 1);
					movePA(i + 4);
					break;
				case 12:
					movePA(i - 4);
					movePA(i + 1);
					break;
				case 13:
				case 14:
					movePA(i - 4);
					movePA(i - 1);
					movePA(i + 1);
					break;
				case 15:
					movePA(i - 4);
					movePA(i - 1);
					break;
			}
		}
		puzzle[i].observe('click', movepiece);
	}
};

function reset() {
	location.reload();
}

$("#flip").flip({
  axis: 'x',
  trigger: 'hover'
});
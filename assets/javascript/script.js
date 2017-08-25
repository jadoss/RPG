var pickedOpponent = false;

var pickedHero = false;

var opponents;

var opponentsLeft = 3;

var opponent;

var heroId;

var opponentId;

var rounds = 1;

//character array

var playerArray = [
{	
	name: "baratheon",
	img: "assets/images/Baratheon.gif",
	hpunchanged: 150, //Health Points unchanged 
	healthPoints: 150,
	osAttackPoints: 40, //points as used in multiplier
	attackPoints: 40,
	counterAttackPoints: 40
},

{
	name: "lannister",
	img: "assets/images/Lannister.jpg",
	hpunchanged: 400, 
	healthPoints: 400,
	osAttackPoints: 5,
	attackPoints: 5,
	counterAttackPoints: 15,
},

{
	name: "stark",
	img: "assets/images/Stark.jpg",
	hpunchanged: 250, 
	healthPoints: 250,
	osAttackPoints: 8,
	attackPoints: 8,
	counterAttackPoints: 25
},

{
	name: "targaryen",
	img: "assets/images/Targaryen.jpg",
	hpunchanged: 200, 
	healthPoints: 200,
	osAttackPoints: 16,
	attackPoints: 16,
	counterAttackPoints: 30
}];

function heroClick(){
	$(".characterBin").on('click', function(){
		if (!pickedHero){
			heroId = $(this).attr("Id")
			$(this).addClass("hero");
			$(this).siblings("div").addClass("opponents"); //turns unpicked hero's into opponents
			hero = $(this).detach(); //this function singles out your hero profile
			opponents = $(this).siblings('div').detach();
			$("#yourHero").append(hero);
			enemyClick();
			attackButtonClick();
		}
		pickedHero = true;
		$("#instructions").html("Pick your first opponent!");
		
	});
}

function enemyClick(){
	$(".opponents").on('click', function(){
		if (!pickedOpponent){
			$(this).addClass("currentOpponent") //singles out opponent and detaches it into current opponent
			opponentId= $(this).attr("Id");
			opponent = $(this).detach();
			$("#currentOpponent").append(opponent);
			opponentsLeft--;
			$("#instructions").html("");
		}
		pickedOpponent = true;
	});
};

function attackButtonClick(){
	$("#attackButton").on('click', function(){
		playerArray[heroId].attackPoints = playerArray[heroId].osAttackPoints * rounds;
		if (pickedOpponent == true && playerArray[heroId].healthPoints > 0 && playerArray[opponentId].healthPoints > 0) {
			playerArray[heroId].healthPoints = playerArray[heroId].healthPoints - playerArray[opponentId].counterAttackPoints;
			playerArray[opponentId].healthPoints = playerArray[opponentId].healthPoints - playerArray[heroId].attackPoints;
			$("#yourHero .health").html("Health: " + playerArray[heroId].healthPoints);
			$("currentOpponent .health").html("Health: " + playerArray[opponentId].healthPoints);
			rounds++;

			if (playerArray[heroId].healthPoints < 0 && playerArray[opponentId].healthPoints < 0) {
				if (playerArray[heroId].healthPoints < playerArray[opponentId].healthPoints) {
					alert("You Lose. Click the Reset Button to Play Again.")
				}
				else{
					alert("You Win! Press Reset to play again.")
				}
			}

			if (playerArray[heroId].healthPoints < 0 && playerArray[opponentId].healthPoints > 0) {
				alert("You Lose! The God of Fire has given you a nother chance - Click Reset");
			}

			if (playerArray[opponentId].healthPoints < 0 && playerArray[heroId].healthPoints > 0) {
				alert("You Win This Round");
				$("#currentOpponent").empty();
				if (opponentsLeft > 0) {
					$("#instructions").html("Pick your next opponent!");
				}
				if (opponentsLeft == 0) {
					$("#instructions").html("Congratulations! You are King of the Realm! Press reset to play again." )
				}

				pickedOpponent = false;
			}
		};
		!pickedOpponent;
	});
};



function startGame(){
	for (var i = 0; i < playerArray.length; i++) {
		playerArray[i].healthPoints = playerArray[i].hpunchanged;
		characterHTML = "<div class='characterBin' id=" + i + "><img class=characterImage src=" + playerArray[i].img + "><p class='name'>" + playerArray[i].name + "</p><p class='health'>Health Points:" + playerArray[i].healthPoints + "</p></div>";
		$("#playerList").append(characterHTML);
		$("#instructions").html("CHOOSE YOUR FAMILY");

	};

};

$(document).ready(function(){
	startGame();
	heroClick();

	$("#resetButton").on('click', function(){
		console.log("is this on?");
		$("#yourHero").empty();
		$("#currentOpponent").empty();
		$("#playerList").empty();
		startGame();
		heroClick();
		pickedOpponent = false;
		pickedHero = false;
		rounds = 0;
	});
});


// Characters will have a health and attack power. Each attack doubles power when chosen as its user.

//Stark health 120 attack 12

//Lanister health 150 attack 8

//Baratheon health 100 attack 16

//Targaryen health 180 attack 32

//Layout

//Starting Position: List Characters in single-file Line. On start pick your team(Lannister Targaryen etc...), switch to Choose Opponent.

//Choose Opponent: User on top. Opponents listed in single file line below. Pick an Opponent. On click activate Voice Line switch to game mode. 

//Game: Opponent listed below Opponent List. User will attack with their base attack that will double per attack and stack up through your game.
//The Opponent will attack back with Base Attack Score. 


//If User loses play clip of death on right. Button appears retset to begginning. Play Death Clip.


//If Opponents health is 0 the opponent is eliminated then pick a new Opponent.

//Victory: Game is over. A Lion Wolf Dragon Stag Banner will display the background.((TOO MUCH TOO MUCH TOO MUCH!!)) Button Appears Begin again.


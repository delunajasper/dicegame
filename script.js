/*
GAME RULES:

- 2 player dice game.
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
-  if the player rolls double 6, he loses 20 points and if double 1 all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- score points can be set

*/


//invoke initialize when new game is clicked
initialize();

//menu
gameSetup();

//global var stored here
var scores = [0, 0]
var roundScore = 0;

// 0 will be player 1; player 2 will be 1
var activePlayer = 0;

//state variable whether game is playing
var gameOn;

//while menu is up
var configured;





//using type coercion will convert to 0 or 1.
//document.querySelector('#current-' + activePlayer).textContent = dice;

//dice roll btn
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (configured) {
        if (gameOn) {

            //generate random number 

            var dice1 = Math.floor(Math.random() * 6) + 1;
            var dice2 = Math.floor(Math.random() * 6) + 1;

            //display result
            document.getElementById('dice-1').style.display = 'block';
            document.getElementById('dice-2').style.display = 'block';



            //uses dice roll image type coercion
            document.querySelector('#dice-1').src = 'dice-' + dice1 + '.png';
            document.querySelector('#dice-2').src = 'dice-' + dice2 + '.png';

            //update socre if player rolled hasnot rolled 1 then next player

            if (dice1 !== 1 && dice1 !== 6 || dice2 !== 1 && dice2 !== 6) {
                //add to roundscore
                roundScore += dice1 + dice2;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
                //
                document.getElementById('roll-1-msg').style.display = "none";
                document.getElementById('roll-6-msg').style.display = "none";

            } else if (dice1 === 6 && dice2 === 6) { //roll doble 6
                scores[activePlayer] -= 40;

                if (scores[activePlayer] < 0) {
                    scores[activePlayer] = 0
                }
                document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
                document.getElementById('roll-6-msg').style.display = "block";
                document.getElementById('roll-1-msg').style.display = "none";
                //next player
                playerTurn();

            } else { // Upon rolling double 1.
                scores[activePlayer] = 0;
                document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
                playerTurn();
                document.getElementById('roll-1-msg').style.display = "block";
                document.getElementById('roll-6-msg').style.display = "none";
            }

        }
    }

});

//btn hold
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (configured) {
        if (gameOn) {
            //current score added globally
            scores[activePlayer] += roundScore;


            //UI updated; use activeplayer to construct string name. value of scores array from selected player
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

            //players can change game score1
            var goalScore = document.querySelector('.final-score').value;
            var gameWin;

            //check if input value is not empty; undefined, 0, null or "" are typed coerce to false
            if (goalScore) {
                gameWin = goalScore;
            } else {
                //if no input score is 100
                gameWin = 100;
            }

            //player wins game; remove activeplayer panel or else next turn
            if (scores[activePlayer] >= gameWin) {
                document.getElementById('name-' + activePlayer + '-new').textContent = 'Winner!';
                document.querySelector('#dice-1').style.display = 'none';

                document.querySelector('#dice-2').style.display = 'none';

                //player 1 or player 2 panel; adds winner style and remove active panel
                document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
                document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
                document.querySelector('.btn-roll').style.display = "none"; // Hiding the other buttons upon  player victory
                document.querySelector('.btn-hold').style.display = "none";
                document.querySelector('.btn-new').classList.add('new-position'); // Place the "new game" button in the middle of the container




                //after winning set to false 
                gameOn = false;

            } else {
                playerTurn();
            }
        }
    }

});

function playerTurn() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    //set roundscore to 0 when player rolls 1 and player UI becomes 0
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //active changes according to player 
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';

}

//new game button invokes initialize game
document.querySelector('.btn-new').addEventListener('click', initialize);

//starts game
function initialize() {

    //    document.querySelector('.dice').style.display = 'none';


    //reset scores when starting new game
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gameOn = true;


    document.querySelector('#dice-1').style.display = "none";
    document.querySelector('#dice-2').style.display = "none";
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('roll-1-msg').style.display = "none";
    document.getElementById('roll-6-msg').style.display = "none";

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    
    
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");

    document.querySelector(".player-0-panel").classList.add("active");;
    
    document.getElementById('name-0-new').textContent = document.getElementById('input-1').value;
    document.getElementById('name-1-new').textContent = document.getElementById('input-2').value;

    document.querySelector('.btn-roll').style.display = "block"; // Display back the button upon game start
    document.querySelector('.btn-hold').style.display = "block"; // Display back the button upon game startc
    
    document.querySelector('.btn-new').classList.remove('new-position'); //remove new game

}

//

//    document.querySelector('.input-menu').style.display = "block";
//    gameSetup();
//}

//
////menu 
//
function submitInput() { // Upon clicking "complete"
    document.getElementById('name-0-new').textContent = document.getElementById('input-1').value;
    document.getElementById('name-1-new').textContent = document.getElementById('input-2').value;
    document.getElementById('name-0').style.display = "none";
    document.getElementById('name-1').style.display = "none";
    document.querySelector('.wrapper').classList.remove('game-setup');


    if (document.getElementById('name-0-new').textContent === '' || document.getElementById('name-1-new').textContent === '') {
        alert('No name input!');
    } else {
        configured = true;
        initialize();
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
        document.querySelector('.input-menu').style.display = "none";
        document.querySelector('.btn-new').style.display = 'block';
        document.querySelector('.btn-roll').style.display = 'block';
        document.querySelector('.btn-hold').style.display = 'block';
        document.querySelector('.final-score').style.display = 'block';
        document.querySelector('#info-box').style.display = 'block';
        document.querySelector('.main').classList.remove('main');
    }
}
//
//
//
function gameSetup() { // While the game setup menu is up:
    configured = false;
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

    document.querySelector('.btn-new').style.display = 'none';
    document.querySelector('.btn-roll').style.display = 'none';
    document.querySelector('.btn-hold').style.display = 'none';
    document.querySelector('.final-score').style.display = 'none';
    document.querySelector('#info-box').style.display = 'none';

    // Darken the background.
    document.getElementById('dark-wrap').classList.add('main');
}

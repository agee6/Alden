class Player {
    score = 0;
    name = "bob";
    color = "red";
    isComputer = false;
    kickAngleSquare = document.getElementById('kick-angle-square');
    kickAngleTarget = document.getElementById('kick-angle-target');
    kickAngleGoal = document.getElementById('moving-block-kick-angle');
    kickAnglePosition = 0;


    constructor(name, color, isComputer) {
        if (name) {
            this.name = name;
        }
        if ( color) {
            this.color = color;
        }
        if (isComputer) {
            this.isComputer = true;
            this.color = 'black';
            this.name = this.getComputerName();
        }
    }

    getComputerName = () => {
        const possibleNames = [ 'Zach', 'Zaidon', 'Zenipher', 'Zachery', 'Zzzzzz', 'Zxzxzy'];
        const randomNumber = Math.round(Math.random() * (possibleNames.length - 1))
        return possibleNames[randomNumber];
    }

    kick = function(callBack) {
        if (this.isComputer) {
            if (Math.random() > 0.5) {
                this.score += 3;
                callBack(true);
            } else {
                callBack(false);
            }
        } else  {
            this.moveKickAngleGoal(callBack);   
        }
        
    }
    moveKickAngleGoal = (Cb) => {
        // make the boxes appear
        this.kickAngleSquare.className = '';
        this.kickAngleTarget.className = '';
        const totalDistance = 190;
        this.kickAnglePosition = 0;
        let kicked = false;
        let increment = true;
        const onSpaceDown = (e) => {
            e.preventDefault();
            if (e.code === 'Space') {
                kicked = true; 
                this.checkIfAngleIsIn(Cb);
            }
            document.removeEventListener('keydown', onSpaceDown)
        }
        document.addEventListener('keydown', onSpaceDown)
        const moveGoal = () => {
            if(kicked) {
                return;
            }
            if (this.kickAnglePosition >= totalDistance) {
                increment = false;
            }

            if (this.kickAnglePosition <= 0) {
                increment = true;
            }

            this.kickAnglePosition = this.moveOneTick(this.kickAngleGoal, this.kickAnglePosition, increment);
            setTimeout(moveGoal, 5)
        };

        moveGoal();
    }

    checkIfAngleIsIn = (Cb) => {
        const position = this.kickAnglePosition;
        let isIn = false
        if ( position > 75 && position < 125) {
            this.score += 3;
            isIn = true;
        }
        Cb(isIn);
        this.kickAngleSquare.className = 'none';
        this.kickAngleTarget.className = 'none';
    }

    moveOneTick = (ele, currPosition, increment) => {
        let newPosition;
        if (increment) {
            newPosition = currPosition + 1;
        } else {
            newPosition = currPosition - 1;
        }
        ele.style.marginLeft = `${(newPosition)}px`;
        return newPosition;
    }
}

class Game {
    players = [];
    turn = 0;
    gameOver = false;
    constructor(player1, player2) {
        this.players.push(player1);
        this.players.push(player2);
        const scoreboardNames = document.getElementsByClassName("playerName");
        scoreboardNames[0].innerHTML = `${player1.name}: `;
        scoreboardNames[1].innerHTML = `${player2.name}: `;
    }
    start = () => {
        this.updateGoingOn("LETS GET READY TO RUMBLE!!!!!!");
        this.updateTheEnd(' ');
        this.getPlayerKick();
    }

    playTurn = (scored) => {
        if (scored) {
            this.updateGoingOn(`The kick is up and goooood! ${this.players[this.turn].name} scores!`);
        } else {
            this.updateGoingOn(`oooo, close shot, ${this.players[this.turn].name} misses!`);
        }
        this.updateScoreBoard();
        this.changeTurn();
        this.checkForVictory();
        console.log("Where are wee????");
        console.log(this.turn);
        if (!this.gameOver) {
            setTimeout(this.getPlayerKick, 1000);
        }    
    }

    getPlayerKick = () => {
        console.log(this.turn);
        this.fansApplading();
        this.players[this.turn].kick(this.playTurn);
    }

    changeTurn = () => {
        this.turn = this.turn === 0 ? 1 : 0;    
    }

    printScore = () => {
        console.log(`Current score:`);
        console.log(`${this.players[0].name}: ${this.players[0].score}`);
        console.log(`${this.players[1].name}; ${this.players[1].score}`);
    }

    checkForVictory = () => {
        for(let i = 0; i < 2; i++) {
            if (this.players[i].score > 10) {
                this.gameOver = true;
                this.updateTheEnd(`Congratulations, ${this.players[i].name} has won the game!`);
                this.printScore();
            }
        }   
    }

    fansApplading = () => {
        const fans = document.getElementsByClassName("fans-talking");
        fans[this.turn].innerHTML = `Gooo ${this.players[this.turn].name}, score that goal!`;
        const opposingTurn = this.turn === 0 ? 1 : 0;
        fans[opposingTurn].innerHTML = "";
    }

    updateScoreBoard = () => {
        const homeScore = document.getElementById('home-score');
        const awayScore = document.getElementById('away-score');
        homeScore.innerHTML = this.players[0].score;
        awayScore.innerHTML = this.players[1].score;
    
    }
    
    updateGoingOn = (text) => {
        const goingOn = document.getElementById('going-on');
        goingOn.innerHTML = text;
    }

    updateTheEnd = (text) => {
        const theEnd = document.getElementById('the-end');
        theEnd.innerHTML = text;
    }

}
const submit = document.getElementById('submit');
const startButton = document.getElementById('start-game');
const setUpGameSection = document.getElementById('set-up-game-section');
const gameModeSelect = document.getElementById('game-mode');
const setUpPlayers = document.getElementById('set-up-player');
const player1NameInput = document.getElementById('player-1-name-input');
const color1Input = document.getElementById('player-1-color');
const player2NameInput = document.getElementById('player-2-name-input');
const color2Input = document.getElementById('player-2-color');
const player2Data = document.getElementById('player-2-data');
let player1Name = '';
let player2Name = '';
let player1Color =  'red';
let player2Color = 'red';
let gameMode = 'one';
const startFunction = () => {
    startButton.className = 'none';
    setUpGameSection.className = '';  
}

gameModeSelect.addEventListener('change', () => {
    gameMode = gameModeSelect.value;
    if ( gameMode === 'one') {
        player2Data.className = 'none';
    } else {
       player2Data.className = '';
    }
})

submit.addEventListener('click', () => {
    player1Name = player1NameInput.value;
    player2Name = player2NameInput.value;
    if (player1Name.length < 1) {
        alert("player one name is required");
        return;
    }

    if (gameMode === 'two' && player2Name.length < 1) {
        alert ('player two name is required');
        return;
    }

    player1Color = color1Input.value;
    player2Color = color2Input.value;

    console.log(player1Color, player2Color, player1Name, player2Name);

    const player1 = new Player(player1Name, player1Color);
    let player2;
    if (gameMode === 'two') {
        player2 = new Player(player2Name, player2Color);
    } else {
        player2 = new Player('', '', true);
    }

    const game = new Game(player1, player2);
    setUpGameSection.className = 'none';
    game.start();
})



startButton.addEventListener('click', startFunction)


let game = (function(){

    let playerTurn;

    let gameFlow = {
        gameBoard: [[[0], [0], [0]],
                    [[0], [0], [0]],
                    [[0], [0], [0]]],
        playerOne: {},
        playerTwo: {},
    }

    //Create the players
    function addPlayer(defaultName){
        let name = prompt("whats your name?", defaultName);
        let mark;
        let hasPlayed = false;

        if(gameFlow.playerOne.mark === undefined){
            mark = prompt("choose a mark! 1 = X, 2 = O");
            mark === 2 ? mark = "O" : mark = "X";

        } else if(gameFlow.playerOne.mark === "X"){
            mark = "O";

        } else{
            mark = "X";

        }
        
        return{
            name,
            mark,
            hasPlayed
        }
    }
    
    function toggleTurn(){

        if(gameFlow.playerOne.hasPlayed === false){
            playerTurn = gameFlow.playerOne;

            gameFlow.playerOne.hasPlayed = true;
            gameFlow.playerTwo.hasPlayed = false;
            console.warn(gameFlow.playerOne.name + " Turn!");

        } else{
            playerTurn = gameFlow.playerTwo;

            gameFlow.playerOne.hasPlayed = false;
            gameFlow.playerTwo.hasPlayed = true;
            console.warn(gameFlow.playerTwo.name + " Turn!");

        }
    }

    function addMark(x, y){
        let markValue = gameFlow.gameBoard[y][x][0];

        if(markValue === 0){
            gameFlow.gameBoard[y][x] = playerTurn.mark;

            console.table(gameFlow.gameBoard);
            toggleTurn();

        } else{
            console.error("That place its already taken");

        }  

    }

    gameFlow.playerOne = addPlayer("playerOne");
    gameFlow.playerTwo = addPlayer("playerTwo");
    toggleTurn();

    return{
        addMark: addMark,
    }

})();
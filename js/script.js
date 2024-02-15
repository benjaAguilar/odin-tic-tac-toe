let game = (function(){

    let playerTurn;
    let playerMark;

    let gameFlow = {
        gameBoard: [[0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0]],
        playerOne: {},
        playerTwo: {},
    }

    let threeInRow = {
        row: [],
        column: [],
        diagonal: [],
        reverseDiagonal: []   
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

    function endGame(){
        if(playerMark === gameFlow.playerOne.mark){
            console.log(gameFlow.playerOne.name + "WON!");

        } else if(playerMark === gameFlow.playerTwo.mark){
            console.log(gameFlow.playerTwo.name + "WON!");

        }

        gameFlow.gameBoard = [[1, 1, 1],
                              [1, 1, 1],
                              [1, 1, 1]];
    }

    function checkRow(mark, i, arr){
        
        if(mark === gameFlow.playerOne.mark){
            arr.indexOf(gameFlow.playerTwo.mark) != -1 ? playerMark = "" : playerMark = gameFlow.playerOne.mark; 

        } else if(mark === gameFlow.playerTwo.mark){
            arr.indexOf(gameFlow.playerOne.mark) != -1 ? playerMark = "" : playerMark = gameFlow.playerTwo.mark; 

        }

        return mark === playerMark
    }

    function checkTie(mark, i, arr){
        return mark != 0
    }

    //Checks if there are a 3 in a row or a tie
    function checkGameboard(){

        let diagonalIndex = 0;
        let reverseIndex = 2;
        
        for(let i = 0; i <= 2; i++){

            //row search
            gameFlow.gameBoard[i].forEach((row) => {
                threeInRow.row.push(row);
                
            });
            
            //column search
            gameFlow.gameBoard.forEach((column) => {
                threeInRow.column.push(column[i]);

            });

            playerMark = "";

            if(threeInRow.row.every(checkRow) || threeInRow.column.every(checkRow)){
                endGame();

            }

            threeInRow.row = [];
            threeInRow.column = [];
        }

        //diagonal search
        gameFlow.gameBoard.forEach((diagonal) => {
            threeInRow.diagonal.push(diagonal[diagonalIndex])

            diagonalIndex++;
        });

        gameFlow.gameBoard.forEach((diagonal) => {
            threeInRow.reverseDiagonal.push(diagonal[reverseIndex]);

            reverseIndex--;
        });

        if(threeInRow.diagonal.every(checkRow) || threeInRow.reverseDiagonal.every(checkRow)){
            endGame();
            
        }

        threeInRow.diagonal = [];
        threeInRow.reverseDiagonal = [];
        
        if(gameFlow.gameBoard[0].every(checkTie) && gameFlow.gameBoard[1].every(checkTie) && gameFlow.gameBoard[2].every(checkTie)){
            console.warn("ITS A TIE!");

        }
    }

    function addMark(x, y){
        let markValue = gameFlow.gameBoard[y][x];

        if(markValue === 0){
            gameFlow.gameBoard[y][x] = playerTurn.mark;

            console.table(gameFlow.gameBoard);
            console.log(gameFlow.gameBoard);
            toggleTurn();
            checkGameboard();

        } else{
            console.error("That place its already taken");

        }  

    }

    gameFlow.playerOne = addPlayer("playerOne");
    gameFlow.playerTwo = addPlayer("playerTwo");
    toggleTurn();
    console.log(threeInRow);
    
    return{
        addMark: addMark,
        threeInRow: threeInRow,
    }

})();
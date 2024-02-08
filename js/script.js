let game = (function(){

    let playerTurn;

    let gameFlow = {
        gameBoard: [[0, 0, 0],
                    [0, 0, 0],
                    [0, 0, 0]],
        playerOne: {},
        playerTwo: {},
    }

    let threeInRow = {
        row: [[], [], []],
        column: [[], [], []],
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

    //Checks if there are a 3 in a row or a tie
    function checkGameboard(){

        let diagonalIndex = 0;
        let reverseIndex = 2;
        
        for(let i = 0; i <= 2; i++){

            //row search
            gameFlow.gameBoard[i].forEach((row) => {
                console.log(row)
                threeInRow.row[i].push(row);
            });
            
            //column search
            gameFlow.gameBoard.forEach((column) => {
                console.log(column[i]);
                threeInRow.column[i].push(column[i]);
            });

            //diagonal search
            gameFlow.gameBoard.forEach((diagonal) => {
                console.log(diagonal[diagonalIndex]);
                threeInRow.diagonal.push(diagonal[diagonalIndex])

                diagonalIndex++;
            });

            gameFlow.gameBoard.forEach((diagonal) => {
                console.log(diagonal[reverseIndex]);
                threeInRow.reverseDiagonal.push(diagonal[reverseIndex]);

                reverseIndex--;
            });
            
        }
        console.log(threeInRow);
        
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
    }

})();
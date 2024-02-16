let game = (function(){

    let playerTurn;
    let playerMark;
    let someoneWon = false;
    let x = 0;
    let y = 0;
    let id = 0;

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

    //DOM SELECTIONS
    let blocks = document.querySelectorAll(".block");
    let displayTurn = document.querySelector(".player-turn");
    let resultsModal = document.querySelector(".results");
    let restartBtn = document.querySelector(".restart");
    
    blocks.forEach((block) => {
        let blockId = id;
        let blockX = x;
        let blockY = y;

        block.addEventListener("click", function(){addMark(blockX, blockY, blockId)});
        x++;
        id++;

        if(x > 2){
            y++;
            x = 0;
        }
    });

    //Create the players
    function addPlayer(defaultName){
        let name = prompt("whats your name?", defaultName);
        let mark;
        let hasPlayed = false;

        if(gameFlow.playerOne.mark === undefined){
            mark = prompt("choose a mark! 1 = X, 2 = O");
            mark === "2" ? mark = "O" : mark = "X";

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
            displayTurn.textContent = gameFlow.playerOne.name + " Turn! " + gameFlow.playerOne.mark;
            console.warn(gameFlow.playerOne.name + " Turn!");

        } else{
            playerTurn = gameFlow.playerTwo;

            gameFlow.playerOne.hasPlayed = false;
            gameFlow.playerTwo.hasPlayed = true;
            displayTurn.textContent = gameFlow.playerTwo.name + " Turn! " + gameFlow.playerTwo.mark;
            console.warn(gameFlow.playerTwo.name + " Turn!");

        }
    }

    function endGame(){
        if(someoneWon === false){
            document.querySelector("h2").textContent = "ITS A TIE!";
            console.log("ITS A TIE!");

        } else if(playerMark === gameFlow.playerOne.mark){
            document.querySelector("h2").textContent = gameFlow.playerOne.name + " WON!";
            console.log(gameFlow.playerOne.name + "WON!");

        } else if(playerMark === gameFlow.playerTwo.mark){
            document.querySelector("h2").textContent = gameFlow.playerTwo.name + " WON!";
            console.log(gameFlow.playerTwo.name + "WON!");

        }

        resultsModal.showModal();

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
                someoneWon = true;
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
            someoneWon = true
            endGame();
            
        }

        threeInRow.diagonal = [];
        threeInRow.reverseDiagonal = [];
        
        if(gameFlow.gameBoard[0].every(checkTie) && gameFlow.gameBoard[1].every(checkTie) && gameFlow.gameBoard[2].every(checkTie)){
            endGame();

        }
    }

    function addMark(x, y, id){
        let markValue = gameFlow.gameBoard[y][x];

        if(markValue === 0){
            gameFlow.gameBoard[y][x] = playerTurn.mark;
            
            document.getElementById(id).textContent = playerTurn.mark;
            console.table(gameFlow.gameBoard);
            console.log(gameFlow.gameBoard);
            toggleTurn();
            checkGameboard();

        } else{
            console.error("That place its already taken");

        }  

    }

    restartBtn.addEventListener("click", function(){location.reload()});

    gameFlow.playerOne = addPlayer("playerOne");
    gameFlow.playerTwo = addPlayer("playerTwo");
    toggleTurn();
    console.log(gameFlow.gameBoard);
    
    return{
        addMark: addMark,
        threeInRow: threeInRow,
    }

})();
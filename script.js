class Morski{
    constructor(gameActive, currentPlayer, gameState, fieldSize, win){
        this.gameActive = true;
        this.currentPlayer = "X";
        this.fieldSize = 0;
        this.win = 0;
        this.input = document.querySelector('#game--input');
        this.cellh = document.querySelectorAll('.cell');
        this.gameState = [];
        this.res = document.querySelector('.game--restart');
        this.stat = document.querySelectorAll('.game--status');
        this.init();
        this.count = 0;
        this.wWays = [];
        this.yWays = [];
    }
    //let gameActive = true;
    //let currentPlayer = "X";
    //let gameState = ["", "", "", "", "", "", "", "", ""];

    handleInput() {
        this.fieldSize = document.getElementById("field-size").value;
        this.win = document.getElementById("win-amount").value;

        for (let i = 0; i < this.fieldSize ** 2; i++) {
            let field = document.createElement("DIV");
            field.setAttribute("class", "cell");
            field.setAttribute("id", i);
            document.getElementById("game--container").appendChild(field);
        }

        this.gameState = Array(this.fieldSize ** 2).fill("");
        document.getElementById("game--container").style.gridTemplateColumns = `repeat(${this.fieldSize}, auto)`;
        document.getElementById("game--input").style.display = 'none';
        document.getElementById("game--field").style.display = 'inline-block';
    }

    handleCellPlayed(clickedCell, clickedCellIndex) {    
        this.gameState[clickedCellIndex] = this.currentPlayer;
        if(this.currentPlayer === "O"){

            clickedCell.style.background = 'red';
        }               
        else if(this.currentPlayer === "X"){

            clickedCell.style.background = 'white';
        }
        clickedCell.innerHTML = this.currentPlayer;
    }

    handlePlayerChange() {
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
        this.stat.forEach(header => header.innerHTML = `${this.currentPlayer} turn`);
        this.stat;
      
    }

    handleResultValidation() {
        let roundWon = false;
        
        for (let i = 0; i <= this.fieldSize; i++) {
            let flag = 0;    
            for(let j = 0; j <= this.fieldSize; j++)
            {
                
                if(this.gameState[i*this.fieldSize + j] === "X"){
                        
                    flag = flag + 1;
                        
                    if(flag == this.win){
                        this.stat.forEach(header => header.innerHTML = "X won!");
                        roundWon = true;
                        flag = 0;
                        break;
                    }
                }
                else{
                    flag = 0;
                }
            }
            for(let j = 0; j <= this.fieldSize; j++)
            {
                
                if(this.gameState[i*this.fieldSize + j] === "O"){
                        
                    flag = flag + 1;
                        
                    if(flag == this.win){
                        this.stat.forEach(header => header.innerHTML = "O won!");
                        roundWon = true;
                        flag = 0;
                        break;
                    }
                }
                else{
                    flag = 0;
                }
            }
                // for (let i = 0; i < this.fieldSize; i++){
                //     let flag = 0;
                //     for (var j = 0 ; j < this.win ; j++){
                //       if(parseInt(input[j].slice(1,2)) === i){
                //         flag +=1;
                //       }
                //       if (flag === this.fieldSize){
                //         flag = 0;
                //         roundWon = true;
                //         break;
                //       }
                //     }
                //   }
            //     this.flag = flag + 1;
            //     if(clickedCell.getAttribute('id') + 1 == 'X'){
            //         this.flag = flag + 1;
            //         if(this.flag == this.fieldSize){
            //             this.stat;
            //             //debugger
            //             const allCells = document.querySelectorAll('.cell') //.forEach(cell => cell.style.background = 'green');
            //             if(this.currentPlayer === "X"){
            //                 this.stat.forEach(header => header.innerHTML = "X won!");
            //             }
            //             else if(this.currentPlayer === "O"){
            //                 this.stat.forEach(header => header.innerHTML = "O won!");
            //             }
            //             roundWon = true;
            //             break
            //         }
            //     }
            // }
            // else if(this.currentPlayer == "O")
            // {
            //     this.flag = flag + 1;
            //     if(clickedCell.getAttribute('id') + 1 == 'O'){
            //         this.flag = flag + 1;
            //         if(this.flag == this.fieldSize){
            //             this.stat;
            //             //debugger
            //             const allCells = document.querySelectorAll('.cell') //.forEach(cell => cell.style.background = 'green');
            //             if(this.currentPlayer === "X"){
            //                 this.stat.forEach(header => header.innerHTML = "X won!");
            //             }
            //             else if(this.currentPlayer === "O"){
            //                 this.stat.forEach(header => header.innerHTML = "O won!");
            //             }
            //             roundWon = true;
            //             break
            //         }
            //     }
            // }

            
                //'bjhjhhj' + asd + 'asdasd' === "nhnj" != `nhjnj ${asd}`
                
            
            
        }
        if (roundWon) {
            //debugger
            this.gameActive = false;     
            return;
        }
        
        let roundDraw = this.count == this.gameState.length; //gamestate.lenght
 
        if (roundDraw) {
            this.stat.forEach(header => header.innerHTML = "Draw!");
            this.cellh.forEach(cell => cell.style.background = 'orangered');

            //debugger
            this.gameActive = false;
            return;
        }
    }

    handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(
            clickedCell.getAttribute('id')
        );
        
        console.log(this);
        //debugger;
        if (this.gameState[clickedCellIndex] !== "" || !this.gameActive) {
            
            return;
        }  
        this.handleCellPlayed(clickedCell, clickedCellIndex);
        this.count++;
        this.handleResultValidation();
        if(this.gameActive){
            this.handlePlayerChange();
        }
    }

    handleRestartGame() {
        this.gameActive = true;
        this.currentPlayer = "X";
        this.gameState = Array(this.fieldSize ** 2).fill("");
        this.cellh.forEach(cell => cell.innerHTML = "");
        this.cellh.forEach(cell => cell.style.background = 'yellow');
        this.stat.forEach(header => header.innerHTML = "X turn");
        this.count = 0;
        this.flag = 0;
    }

    init(){
        this.cellh.forEach(cell => cell.addEventListener('click', (event) => this.handleCellClick(event)));
        this.res.addEventListener('click', (event) => this.handleRestartGame(event));
        this.stat.forEach(header => header.innerHTML = "X turn");  
    }
  
    run(){
        this.fieldSize = document.getElementById("field-size").value;
        this.win = document.getElementById("win-amount").value;
        this.gameState = Array(this.fieldSize ** 2).fill("");
    }       
    
}

// const winningConditions = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6]
// ];



// (new Morski()).run()

/*var el = document.getElementById("clickMe");
if (el.addEventListener){
    el.addEventListener("click", (new Morski()).run(), false);
}
else if (el.attachEvent){
    el.attachEvent('onclick', (new Morski()).run());
}*/
//document.getElementById("clickMe").onclick = (new Morski()).run();

// function MyClass() {
//     this.instanceData = "Display Me";

//     this.DisplayData = function() {
//         alert(this.instanceData);
//     }
// }

// classInstance = new MyClass()

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
        //this.flag = 0;
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
        //console.log(clickedCellIndex);
    }

    handlePlayerChange() {
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
        this.stat.forEach(header => header.innerHTML = `${this.currentPlayer} turn`);
        this.stat;
      
    }

    /*handleMatch(i, j){
        if(this.gameState[i*this.fieldSize + j] === "X"){
                        
            this.flag = flag + 1;
                
            if(this.flag == this.win){
                this.stat.forEach(header => header.innerHTML = "X won!");
                flag = 0;
            }
        }
        else if(this.gameState[i*this.fieldSize + j] === "O"){
                        
            this.flag = flag + 1;
                
            if(this.flag == this.win){
                this.stat.forEach(header => header.innerHTML = "O won!");
                flag = 0;
            }
        }
        
    }*/

    handleResultValidation() {
        // const winningConditions = [
        //     // [0, 1, 2],
        //     // [3, 4, 5],
        //     // [6, 7, 8],
        //     // [0, 3, 6],
        //     // [1, 4, 7],
        //     // [2, 5, 8],
        //     // [0, 4, 8],
        //     // [2, 4, 6]
        // ];

        // for(let a = 0; a <= Math.pow(this.fieldSize, 2); a += this.fieldSize){
        //     let mass = [];
        //     for(let j = a; j < a + this.fieldSize; j++){
        //         mass.push(j);
        //     }
        //     winningConditions.push(mass);
        // }


        let roundWon = false;
        
        for (let i = 0; i <= this.fieldSize; i++) {
            let flag = 0;
            let yflag = 0;
            let xvflag = 0;
            let yvflag = 0;  
            let xxvflag = 0;
            let yyvflag = 0;
            let xxxvflag = 0;
            let yyyvflag = 0;  
            for(let j = 0; j <= this.fieldSize; j++)
            {
                //pomoshtna funkciq za proverka dali e X ili O
                // 1 maks 2 cikula do 30tina reda
                if(this.gameState[i*this.fieldSize + j] === "X"){
                        
                    flag = flag + 1;
                        
                    if(flag == this.win){
                        this.stat.forEach(header => header.innerHTML = "X won!");
                        roundWon = true;
                        flag = 0;
                        break;
                    }
                }
                
                else if(this.gameState[i*this.fieldSize + j] === "O"){
                        
                    yflag = yflag + 1;
                        
                    if(yflag == this.win){
                        this.stat.forEach(header => header.innerHTML = "O won!");
                        roundWon = true;
                        yflag = 0;
                        break;
                    }
                }
                else{
                    flag = 0;
                    yflag = 0;
                }
                if(this.gameState[i + j * this.fieldSize] === "X"){
                    xvflag = xvflag + 1;
                    if(xvflag == this.win){
                        this.stat.forEach(header => header.innerHTML = "X won!");
                        roundWon = true;
                        xvflag = 0;
                        break;
                    }
                    
                }
                else if(this.gameState[i + j * this.fieldSize] === "O"){
                    
                    yvflag = yvflag + 1;
                    
                    if(yvflag == this.win){
                        this.stat.forEach(header => header.innerHTML = "O won!");
                        roundWon = true;
                        yvflag = 0;
                        break;
                    }
                }
                else{
                    xvflag = 0;
                    yvflag = 0;
                }
                if(this.gameState[i + j * this.fieldSize + j] === "X"){
                    xxvflag = xxvflag + 1;
                    if(xxvflag == this.win){
                        this.stat.forEach(header => header.innerHTML = "X won!");
                        roundWon = true;
                        xxvflag = 0;
                        break;
                    }
                    
                }
                
                else if(this.gameState[i + j * this.fieldSize + j] === "O"){
                    
                    yyvflag = yyvflag + 1;
                    
                    if(yyvflag == this.win){
                        this.stat.forEach(header => header.innerHTML = "O won!");
                        roundWon = true;
                        yyvflag = 0;
                        break;
                    }
                }
                else{
                    xxvflag = 0;
                    yyvflag = 0;
                }
                 if(this.gameState[i + j * this.fieldSize - j] === "X"){
                    xxxvflag = xxxvflag + 1;
                    if(xxxvflag == this.win){
                        this.stat.forEach(header => header.innerHTML = "X won!");
                        roundWon = true;
                        xxxvflag = 0;
                        break;
                    }
                    // 2 funkcii, 1 koqto da smqta indeksa ot i i j(prevrushta koordinati v index i druga index v koordinati)!
                }
                
                else if(this.gameState[i + j * this.fieldSize - j] === "O"){
                    //console.log(i + j * this.fieldSize - j);
                    console.log(i);
                    console.log(j);
                    yyyvflag = yyyvflag + 1;
                    
                    if(yyyvflag == this.win){
                        this.stat.forEach(header => header.innerHTML = "O won!");
                        roundWon = true;
                        yyyvflag = 0;
                        break;
                    }
                }
                else{
                    xxxvflag = 0;
                    yyyvflag = 0;

                }
            }
            
            // for(let j = 0; j < this.fieldSize; j++)
            // {
                
            //     // else if(this.gameState[i + j * this.fieldSize] === "X"){
            //     //     xvflag = xvflag + 1;
            //     //     if(xvflag == this.win){
            //     //         this.stat.forEach(header => header.innerHTML = "X won!");
            //     //         roundWon = true;
            //     //         xvflag = 0;
            //     //         break;
            //     //     }
                    
            //     // }
            //     // else if(this.gameState[i + j * this.fieldSize] === "O"){
                    
            //     //     yvflag = yvflag + 1;
                    
            //     //     if(yvflag == this.win){
            //     //         this.stat.forEach(header => header.innerHTML = "O won!");
            //     //         roundWon = true;
            //     //         yvflag = 0;
            //     //         break;
            //     //     }
            //     // }
            //     else{
            //         yvflag = 0;
            //         xvflag = 0;
            //     }
                
            // }

            // for(let j = 0; j < this.fieldSize; j++)
            // {
                
            //     else if(this.gameState[i + j * this.fieldSize + j] === "X"){
            //         xxvflag = xxvflag + 1;
            //         if(xxvflag == this.win){
            //             this.stat.forEach(header => header.innerHTML = "X won!");
            //             roundWon = true;
            //             xxvflag = 0;
            //             break;
            //         }
                    
            //     }
                
            //     else if(this.gameState[i + j * this.fieldSize + j] === "O"){
                    
            //         yyvflag = yyvflag + 1;
                    
            //         if(yyvflag == this.win){
            //             this.stat.forEach(header => header.innerHTML = "O won!");
            //             roundWon = true;
            //             yyvflag = 0;
            //             break;
            //         }
            //     }
            //     else{
            //         yyvflag = 0;
            //         xxvflag = 0;
            //     }
                
            // }
           

            // for(let j = 0; j < this.fieldSize; j++)
            // {
                
            //     else if(this.gameState[i + j * this.fieldSize - j] === "X"){
            //         xxxvflag = xxxvflag + 1;
            //         if(xxxvflag == this.win){
            //             this.stat.forEach(header => header.innerHTML = "X won!");
            //             roundWon = true;
            //             xxxvflag = 0;
            //             break;
            //         }
            //         // 2 funkcii, 1 koqto da smqta indeksa ot i i j(prevrushta koordinati v index i druga index v koordinati)!
            //     }
                
            //     else if(this.gameState[i + j * this.fieldSize - j] === "O"){
            //         //console.log(i + j * this.fieldSize - j);
            //         console.log(i);
            //         console.log(j);
            //         yyyvflag = yyyvflag + 1;
                    
            //         if(yyyvflag == this.win){
            //             this.stat.forEach(header => header.innerHTML = "O won!");
            //             roundWon = true;
            //             yyyvflag = 0;
            //             break;
            //         }
            //     }
            //     else{
            //         yyyvflag = 0;
            //         xxxvflag = 0;
            //     }
            // }
            // for(let j = 0; j < this.fieldSize; j++)
            // {
                
            //     if(this.gameState[i + j * this.fieldSize - j] === "O"){
                    
            //         yyyvflag = yyyvflag + 1;
                    
            //         if(yyyvflag == this.win){
            //             this.stat.forEach(header => header.innerHTML = "O won!");
            //             roundWon = true;
            //             yyyvflag = 0;
            //             break;
            //         }
            //     }
            //     else{
            //         yyyvflag = 0;
            //     }
            // }

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

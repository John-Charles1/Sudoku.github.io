
let numSelected = null;
let tileSelected = null;

let errors = 0;

var board = [
    // "--74916-5",
    // "2---6-3-9",
    // "-----7-1-",
    // "-586----4",
    // "--3----9-",
    // "--62--187",
    // "9-4-7---2",
    // "67-83----",
    // "81--45---",
    [0,0,7,4,9,1,6,0,5],
    [2,0,0,0,6,0,3,0,9],
    [0,0,0,0,0,7,0,1,0],
    [0,5,8,6,0,0,0,0,4],
    [0,0,3,0,0,0,0,9,0],
    [0,0,6,2,0,0,1,8,7],
    [9,0,4,0,7,0,0,0,2],
    [6,7,0,8,3,0,0,0,0],
    [8,1,0,0,4,5,0,0,0,],
]

var solution = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
]

window.onload = function(){
    setGame();
}

function setGame(){
    
    for(let i = 1; i <= 9; i++){
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);       
    }

    for(let r = 0; r < 9; r++){
        for(let c = 0; c < 9; c++){
            let tile = document.createElement("div");
            tile.id = r.toString()+"-"+c.toString();
            if(board[r][c] != 0){
                tile.innerText = board[r][c];
                tile.classList.add("tile-selected");
            }

            if(r == 2 || r == 5)
                tile.classList.add("horizontal-line");
            if(c == 2 || c == 5)
                tile.classList.add("vertical-line");
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }

    let solveButton = document.createElement("button");
    solveButton.type = "button";
    solveButton.innerText = "Solve!";
    solveButton.addEventListener("click", solve);
    document.getElementById("button").append(solveButton);
}

function solve(){
    if(solveSudoku(board)){
        for(let r = 0; r < 9; r++){
            for(let c = 0; c < 9; c++){
                document.getElementById(r.toString()+"-"+c.toString()).innerText = board[r][c];
            }
        }
    }else{
        alert("no solution dipshit");
    }
}
function selectNumber(){
    if(numSelected != null){
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile(){
    if(numSelected){
        if(this.innerText != "")
            return
        this.innerText = numSelected.id;

        let coords = this.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if(solution[r][c] == numSelected.id){
            this.innerText = numSelected.id;
        }else{
            errors++;
            document.getElementById("errors").innerText = errors;
        }
    }
}


function solveSudoku(grid) {
    // This function will return the first empty cell it finds in the grid, or null if the grid is full
    function findEmptyCell() {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (grid[row][col] == 0) {
            return { row, col };
          }
        }
      }
      return null;
    }
  
    // This function will return true if the given number is valid in the given row, false otherwise
    function isValidInRow(row, num) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] == num) return false;
      }
      return true;
    }
  
    // This function will return true if the given number is valid in the given column, false otherwise
    function isValidInCol(col, num) {
      for (let row = 0; row < 9; row++) {
        if (grid[row][col] == num) return false;
      }
      return true;
    }
  
    // This function will return true if the given number is valid in the 3x3 subgrid, false otherwise
    function isValidInSubgrid(row, col, num) {
      let startRow = Math.floor(row / 3) * 3;
      let startCol = Math.floor(col / 3) * 3;
      for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
          if (grid[i][j] == num) return false;
        }
      }
      return true;
    }
  
    // This function will return true if the given number is valid in the given cell, false otherwise
    function isValid(row, col, num) {
      return isValidInRow(row, num) && isValidInCol(col, num) && isValidInSubgrid(row, col, num);
    }
  
    // This function will try to solve the puzzle by trying different numbers in empty cells
    function solve() {
      let emptyCell = findEmptyCell();
      if (!emptyCell) return true; // If there are no empty cells, the puzzle is solved
  
      let { row, col } = emptyCell;
  
      // Try every possible number for the current cell
      for (let num = 1; num <= 9; num++) {
        if (isValid(row, col, num)) {
          // If the number is valid, place it in the cell and try to solve the rest of the puzzle
          grid[row][col] = num;
          if (solve()) return true; // If the puzzle is solved, return true
          grid[row][col] = 0; // If the puzzle is not solved, backtrack and try a different number
        }
      }
      return false; // If no number works, return false
    }
  
    return solve();
  }
  
import {
  WIDTH,
  HEIGHT,
  gameState,
  makeBoard,
  findSpotInCol,
  checkForWin,
  switchCurrPlayer,
} from "./connect4.js";


/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  const $htmlBoard = document.querySelector("#board");

  // Top row where user places a piece.
  const $top = document.createElement("tr");
  $top.setAttribute("id", "column-top");

  // Adds a cell for each column in the board.
  for (let x = 0; x < WIDTH; x++) {
    const $headCell = document.createElement("td");
    $headCell.setAttribute("id", `top-${x}`);
    $headCell.addEventListener("click", handleClick);
    $top.append($headCell);
  }
  $htmlBoard.append($top);

  // dynamically creates the main part of html board
  for (let y = 0; y < HEIGHT; y++) {
    const $row = document.createElement('tr');

    for (let x = 0; x < WIDTH; x++) {
      const $cell = document.createElement('td');
      $cell.id = `c-${y}-${x}`;

      $row.append($cell);
    }

    $htmlBoard.append($row);
  }
}


/** placeInTable: update DOM to place piece into HTML table of board */
function placeInTable(y, x) {
  console.log("placing a piece in the board with coordinates: ", y, x);
  const cell = document.querySelector(`#c-${y}-${x}`);
  const piece = document.createElement("div");

  piece.className = `piece player-${gameState.currPlayer}-piece`;

  cell.appendChild(piece);
}


/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
}


/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = Number(evt.target.id.slice("top-".length));

  // get next spot in column (if none, ignore click)
  const y = findSpotInCol(x);
  if (y === null) {
    return;
  }

  // place piece in board
  // TODO: add line to update `board` state with new piece
  gameState.board[y][x] = gameState.currPlayer;


  // add to HTML table
  placeInTable(y, x);

  console.log("board", gameState.board);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${gameState.currPlayer} won!`);
  }

  // check for tie: if top row is filled, board is filled
  // TODO: check if all cells in board are filled; if so, call endGame

  // TODO: switch players

}


/** Start game. */

function start() {
  makeBoard();
  makeHtmlBoard();
}


export { start };

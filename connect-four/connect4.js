/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

const gameState = {
  currPlayer: 1, // active player: 1 or 2
  board: Array(HEIGHT), // array of HEIGHT number of slots
  // Each array slot is empty to start, but will be filled in with an array
  // of WIDTH later.
  // These inner arrays will represent rows.
  // gameState.board[HEIGHT][0] represents the bottom-left spot on the board
};


function switchCurrPlayer() {
  // TODO: switch currPlayer 1 <-> 2
}

function makeBoard() {
  console.log("making a board with starter object");

  for (let y = 0; y < HEIGHT; y++) {
    const row = Array(WIDTH).fill(null);
    gameState.board[y] = row;
  }
}

/** findSpotInCol: given column x, return y coordinate of furthest-down spot */

function findSpotInCol(x) {
  console.log("findSpotInCol", { x });

  const lastMoveIndex = gameState.board.findIndex((row) => row[x] !== null);

  switch (lastMoveIndex) {
    case -1:
      return gameState.board.length - 1;
    case 0:
      return null;
  }

  return lastMoveIndex - 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */

  // CHECK IF MOVES ARE ON THE BOARD
  // 0 <= y < HEIGHT; 0 <= x < WIDTH

  // CHECK FOR SAME PLAYER
  // all same num
  function _win(cells) {
    // console.log("_win", { cells });

    const currPlayer = gameState.currPlayer;
    // TODO: Check four cells to see if they're all legal & all color of current
    // player
    // check for all same player
    for (let [y, x] of cells) {
      if (y < 0 || y >= HEIGHT) {
        return false;
      } else if (x < 0 || x >= WIDTH) {
        return false;
      } else if (gameState.board[y][x] !== currPlayer) {
        return false;
      }
    }

    return true;
  }

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // TODO: assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDL = [[y, x], [y - 1, x - 1], [y - 2, x - 2], [y - 3, x - 3]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
  return false;
}

export {
  WIDTH,
  HEIGHT,
  gameState,
  makeBoard,
  findSpotInCol,
  checkForWin,
  switchCurrPlayer,
};

/* Preserving this test for internal purposes, not going to add this to the
* student facing tests since it involves very advanced testing strategies. Students
* will have been exposed to Jasmine for 2 days so we need to keep things readable.
*/

it('it correctly identifies a tie game', function () {

    // This is a special jasmine function that let's us track the invocation of 
    // endGame() in connect4.js. It gives us access to some information tracking
    // the number of times this function is called, as well as the arguments
    // passed to it. Jasmine provides methods to check expectations on these 
    // `spied` functions, as we have done here. You can read about `spies` here:
    // https://jasmine.github.io/tutorials/your_first_suite
    spyOn(window, 'endGame');

    // Set some variables to allow us to call handleClick()
    const x = 1
    const evt = { target: { id: `top-${x}` } };

    handleClick(evt);
    // currently, the board has not been filled, so there should not be a call
    // to endGame
    expect(endGame).not.toHaveBeenCalled();

    // Set our board to be in a state where we expect there to be a tie. 
    board[0][0] = 1;
    board[0][1] = 2;
    board[0][2] = 1;
    board[0][3] = 2;
    board[0][4] = 1;
    board[0][5] = 2;
    board[0][6] = 1;

    handleClick(evt);
    expect(endGame).toHaveBeenCalledWith('Tie!');

  });
/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  // var solution = undefined; //fixme

  var board = new Board({n:n});
  var rowCounter = 0;
 
  var innerFunction = function(){
    if (rowCounter === n) {
        return
      }
    for (var i = 0; i < n; i ++) {
      
      board.togglePiece(rowCounter, i);
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(rowCounter, i);
      }
    }
    rowCounter++;
    innerFunction();
  }
  innerFunction();

  var solution = board.rows();
  //var solution = allRows;

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var emptyBoard = new Board({n:n});

  // make board fn to recurse through board
  var checkBoard = function(board, rowNumber){
    if (rowNumber === n - 1) {
      solutionCount++;
      return;
    } else {
      for( var i = 0; i < n; i++ ){
        board.togglePiece(rowNumber, i);
        if( !board.hasColConflictAt(i) ){
          checkBoard(board, rowNumber + 1);
        }
        // untoggle piece
        board.togglePiece(rowNumber, i);
      }
    }
  };
  checkBoard(emptyBoard, 0);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var emptyBoard = new Board({n:n});
  var solution = emptyBoard.rows();

  var checkBoard = function(board, rowNumber){
    if (rowNumber === n) {
      
      return board.rows();
    } else {
      for( var i = 0; i < n; i++ ){
        board.togglePiece(rowNumber, i);
        if( !board.hasAnyQueensConflicts() ){
          var result = checkBoard(board, rowNumber + 1);
          if (result) {
            return result;
          }
        }
        // untoggle piece
        board.togglePiece(rowNumber, i);
      }
    }
  };
  checkBoard(emptyBoard, 0);
  console.log('Single solution for ' + n + ' queens:', solution);
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
   var solutionCount = 0;
  var emptyBoard = new Board({n:n});

  var checkBoard = function(board, rowNumber){
    if (rowNumber === n) {
      solutionCount++;
      return;
    } else {
      for( var i = 0; i < n; i++ ){
        board.togglePiece(rowNumber, i);
        if( !board.hasAnyQueensConflicts() ){
          checkBoard(board, rowNumber + 1);
        }
        // untoggle piece
        board.togglePiece(rowNumber, i);
      }
    }
  };
  checkBoard(emptyBoard, 0);
  return solutionCount;
};

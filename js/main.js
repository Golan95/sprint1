'use strict'

const mines = '💣'
const n1 = '1'
const n2 = '2'
const n3 = '3'

var gGame
var gBoard
var mainBoard
var gSize = 4
var gCell


function onInit() {
  gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 }
  gBoard = { minesAroundCount: 0, isShown: false, isMine: false, isMarked: true }
  mainBoard = buildBoard()
  play()
  renderBoard(mainBoard)

}

function play() {
  console.log('play');
  //startTimer()
  checkNegs(mainBoard)
}


// Builds the board
function buildBoard() {

  const board = []
  for (var i = 0; i < gSize; i++) {
    board.push([])
    for (var j = 0; j < gSize; j++) {
      if (i === 0 && j === 0 || i === 2 && j === 2) {
        board[i][j] = mines

      }
      else {
        board[i][j] = ' '

      }
    }
  }


  console.log('board:', board)
  return board
}

function checkNegs(board) {

  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      console.log(i, j);
      if (board[i][j] === mines) continue
      else {
        var numOfNegs = countNegs(i, j, board)
        console.log('numOfNegs', numOfNegs)
        var minesAround = minesAroundCount(i, j, board)
        console.log('minesAround', minesAround);
      }
    }
  }


}

function countNegs(cellI, cellJ, mat) {
  var negsCount = 0
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= mat.length) continue
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (i === cellI && j === cellJ) continue
      if (j < 0 || j >= mat[i].length) continue

      //if (mat[i][j] !== mines) 
      negsCount++
    }
  }
  return negsCount
}

function minesAroundCount(cellI, cellJ, mat) {
  var minesAround = 0
  for(var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= mat.length) continue
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (i === cellI && j === cellJ) continue
      if (j < 0 || j >= mat[i].length) continue
      if (mat[i][j] === mines)
      minesAround++
    }
  }
  return minesAround
}
function renderBoard(board) {
  // console.table(board)
  var strHTML = ''
  
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>'
    for (var j = 0; j < board[0].length; j++) {
      var currCell = board[i][j]
      strHTML += `<td class="${currCell}"
                          onclick="onCellClicked(${i},${j},this)"
                          onclick="onCellMarked(${i},${j},this)"
                          data-i="${i}" data-j="${j}"> <span class="cell" style="display: none;">
                                ${currCell} </span>
                      </td>`;
                      

    }

    strHTML += '</tr>'
  }
   console.log('strHTML:', strHTML)
  
  document.addEventListener('contextmenu', event => event.preventDefault());
  const elBoard = document.querySelector('.board')
  elBoard.innerHTML = strHTML
  
  
}

function onCellClicked(cellI, cellJ, elCell) {
  console.log('elCell:', elCell)
  
  if (elCell.innerHTML === mines) {
    
    console.log('game over')
    stopTimer()
    gameOver()

  }
  return
}

function onCellMarked(cellI, cellJ, elCell) {

}

function gameOver() {
  console.log('Game Over')
  gGame.isOn = false

}

function chooseLevel(size) {
  gSize = size
  closeModal()
  onInit()
  stopTimer()
  clearTimer()
}



function openModal() {
  var elModal = document.querySelector('.modal')
  elModal.style.display = 'block'
}

function closeModal() {
  var elModal = document.querySelector('.modal')
  elModal.style.display = 'none'
}
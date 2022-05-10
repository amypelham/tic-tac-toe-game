const playerX = "X"
const playerO = "O"
const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

//const winningMessage = document.getElementById('placeToPutWinningMessage')



// //Place an X
 //document.getElementById('topRight').addEventListener('click', placeMarkerX);



// //Place a Y
// document.getElementById('topMiddle').addEventListener('click', placeMarkerY);


// function placeMarkerX() {
//     document.querySelector('#topLeft').innerHTML = 'X';
// }

// function placeMarkerY() {
//     document.querySelector('#topMiddle').innerHTML = 'Y';
// }


// Mark working on the below

const cellElements = document.querySelectorAll('[data-cell]')
const boardElement = document.getElementById('board')
const winningMessageElement = document.getElementById('placeToPutWinningMessage')
const restartButton = document.getElementById('check')
//const winningMessageTextElement = document.getElementById('winningMessageText')
let isPlayer_O_Turn = false

//Startgame
startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
	isPlayer_O_Turn = false
	cellElements.forEach(cell => {
		cell.classList.remove(PLAYER_X_CLASS)
		cell.classList.remove(PLAYER_O_CLASS)
		cell.removeEventListener('click', handleCellClick)
		cell.addEventListener('click', handleCellClick, { once: true })
	})
	setBoardHoverClass()
	winningMessageElement.classList.remove('show')
}

function cellClick(e) {
	const cell = e.target
	const currentClass = isPlayer_O_Turn ? PLAYER_O_CLASS : PLAYER_X_CLASS
	placeMark(cell, currentClass)
	if (checkWin(currentClass)) {
		endGame(false)
	} else if (isDraw()) {
		endGame(true)
	} else {
		swapTurns()
		setBoardHoverClass()
	}
}





function checkWin(currentClass) {
	return WINNING_COMBINATIONS.some(combination => {
		return combination.every(index => {
			return cellElements[index].classList.contains(currentClass)
		})
	})
}




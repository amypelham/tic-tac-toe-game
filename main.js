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
const startNew = document.getElementById('check')
//const winningMessageTextElement = document.getElementById('winningMessageText')
let isPlayer_O_Turn = false

//Startgame
startGame()

startNew.addEventListener('click', startGame)

function startGame() {
	isPlayer_O_Turn = false
	cellElements.forEach(cell => {
		cell.classList.remove(playerX)
		cell.classList.remove(playerO)
		cell.removeEventListener('click', cellClick)
		cell.addEventListener('click', cellClick, { once: true })
	})
	setBoardHoverClass()
	winningMessageElement.classList.remove('show')
}

function cellClick(e) {
	const cell = e.target
	const currentClass = isPlayer_O_Turn ? playerO : playerX
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


function endGame(draw){
    if(draw){
        winningMessageElement.innerText = "It's a draw!"
    }else{
        winningMessageElement.innerText = `Player with ${isPlayer_O_Turn ? "O's" : "X's"} wins!`
    }
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(playerX) || cell.classList.contains(playerO)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns(){
    isPlayer_O_Turn = !isPlayer_O_Turn
}


function setBoardHoverClass() {
	boardElement.classList.remove(playerX)
	boardElement.classList.remove(playerO)
	if (isPlayer_O_Turn) {
		boardElement.classList.add(playerO)
	} else {
		boardElement.classList.add(playerX)
	}
}


function checkWin(currentClass) {
	return WINNING_COMBINATIONS.some(combination => {
		return combination.every(index => {
			return cellElements[index].classList.contains(currentClass)
		})
	})
}




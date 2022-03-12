const X = 'x';
const O = 'circle';
const startBUtton = document.getElementById('startButton')
const firstPage = document.getElementById('firstPage')
const game = document.getElementById('game')

function Player(name_, mark_) {
    let name = name_;
    let mark = mark_;

    const getMark = () => mark
    const getName = () => name
    const setName = (name_) => name = name_
    const addMark = (cell) => {
        cell.classList.add(mark)
    }
    return {
        getMark,
        addMark,
        getName,
        setName
    }
}


const Gameboard = (() => {
    const cells = document.querySelectorAll('[data-cell]')
    const board = document.getElementById('board')
    const restartButton = document.getElementById('restartButton')
    const poup = document.getElementById('winningMessage')
    const winnerName = document.getElementById('winnerName')

    const player1 = Player('', O)
    const player2 = Player('', X)

    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    let i = 0;
    let firstPlayerTurn = true;
    const startGame = (firstPlayerName,secondPlayerName) => {
        firstPlayerTurn = true
        player1.setName(firstPlayerName)
        player2.setName(secondPlayerName)
        cells.forEach(cell => {
            cell.classList.remove(O)
            cell.classList.remove(X)
            cell.removeEventListener('click', handleClick)
            cell.addEventListener('click', handleClick, { once: true })
        })
    }
    const restartGame = () => {
        poup.classList.remove('show')
        setBoardHover(O)
        i = 0
        startGame(player1.getName(),player2.getName())
    }

    const checkWinner = (player) => {
        const isWinner = WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return cells[index].classList.contains(player.getMark())
            })
        })
        console.log(isWinner)
        if (isWinner)
            endGame(player)
        if (i == 8) endGame()
    }
    const endGame = (player) => {
        if (player)
            winnerName.innerText = `${player.getName()} is winner`
        else
            winnerName.innerText = 'Draw!'
        poup.classList.add('show')
        restartButton.addEventListener('click', restartGame, { once: true })
    }

    const setBoardHover = (m) => {
        board.classList.remove(X)
        board.classList.remove(O)
        board.classList.add(m)
    }

    const handleClick = (e) => {
        console.log(e)
        const cell = e.target

        if (firstPlayerTurn) {
            player1.addMark(cell)
            firstPlayerTurn = false
            setBoardHover(player2.getMark())
            i >= 2 && checkWinner(player1)
        } else {
            player2.addMark(cell)
            firstPlayerTurn = true;
            setBoardHover(player1.getMark())
            i >= 2 && checkWinner(player2)
        }
        i++;
    }

    return {
        startGame,
        restartGame,
        setBoardHover
    }

})()



startButton.addEventListener('click',() =>{
    const firstPlayerName = document.getElementById('name1')
    const secondPlayerName = document.getElementById('name2')
    game.classList.add('start-game')
    firstPage.classList.add('hide')
    Gameboard.startGame(firstPlayerName.value , secondPlayerName.value)
} )


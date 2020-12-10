document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')

    const width = 10
    let currentIndex = 0 // so first div in our grid
    let appleIndex = 0 // so first div in our grid
    let currentSnake = [2,1,0] // so the div with 2 = head and 0 will be the tail and body = 1

    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0

function startGame() {
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')
    clearInterval(interval)
    score = 0
    randomApple()
    direction = 1
    scoreDisplay.innerHTML = score
    intervalTime = 1000
    currentSnake = [2,1,0]
    currentIndex = 0
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    interval = setInterval(moveOutcomes, intervalTime)
}


//function that deals with ALL the ove outcomes of the SNAKE
function moveOutcomes() {
    if (
    (currentSnake[0] + width >= (width * width) && direction === width) || // if snake hits bottom
    (currentSnake[0] % width === width -1 && direction === 1) || //if snake hits right wall
    (currentSnake[0] % width === 0 && direction === -1) || // if snake hits left wall
    (currentSnake[0] - width < 0 && direction === -width) ||// if snake hits the top
    squares[currentSnake[0] + direction].classList.contains('snake')
    )// if snake goes into itself
    {
      return clearInterval(intervalTime) // this will clear the interval if any of the above happen
    }

    const tail = currentSnake.pop() // removes last ite of the array and shows it
    squares[tail].classList.remove('snake') // removes class of snake from the TAIL
    currentSnake.unshift(currentSnake[0] + direction) // gives direction to the head

    //deals with snake hitting apple
    if(squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove('apple')
        squares[tails].classList.add('snake')
        currentSnake.push(tail)
        randomApple()
        score++
        scoreDisplay.innerHTML = score
        clearInterval(interval)
        intervalTime = intervalTime * speed
        interval = setInterval(moveOutcomes, intervalTime)
    }

    squares[currentSnake[0]].classList.add('snake')
}


function randomApple() {
    do{
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
}


    function control(e) {
        squares[currentIndex].classList.remove('snake') // remove class so that it doesn't look like it is being left behind

        if(e.keyCode === 39) {
            direction = 1 // if we press the right arrow button the snake will go right
        } else if (e.keyCode === 38) {
            //appear to move up by up arrow, 10 div away from you making it go up
            direction = -width
        } else if (e.keyCode === 37) {
            
            direction = - 1 // go left
        } else if (e.keyCode === 40) {
          
            direction = +width //press down the snake head will appear in the div ten divs from where you are making it go down
        }
    }

    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)
})
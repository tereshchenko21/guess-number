
const playerAnswer = document.getElementById('player-answer')
const victoryMessage = document.getElementById('victory')
const checkButton = document.getElementById('check-button')
const timerElement = document.getElementById('timer')
const scoreElement = document.getElementById('score')
const tipElement = document.getElementById('tip')
const messageTitle = document.getElementById('message-title') //
const gameSection = document.querySelector('#game')
const scoreboardSection = document.querySelector('#scoreboard')

document.getElementById('play-button').onclick = () => {
    document.getElementById('play').remove()
    gameSection.classList.add('active')
    scoreboardSection.classList.add('active')
}

const min = 1
const max = 101

messageTitle.innerHTML = `<span>Компьютер</span>: я загадал число ${min}-${max}. Твоя задача его угадать!`

let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let score = 0
let randomNumber = getRandomNumber(min, max)

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getUserNumber() {
    return playerAnswer.value
}

function updateTimer() {
    milliseconds += 10; 

    if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
    }
    timerElement.innerHTML = `${minutes}:${seconds}:${milliseconds}`;
}

function timer() {
    setInterval(() => {
        updateTimer()
    }, 10)
}

timer()

function getVictoryMessage() {
    setTimeout(() => {
        victoryMessage.classList.add('active')
    }, 0)
    setTimeout(() => {
        victoryMessage.classList.remove('active')
    }, 1500)
}

function incrementScore() {
    score++
    scoreElement.innerHTML = `score: ${score}`
}

function getTip() {
    parseInt(playerAnswer.value) > randomNumber ? 
    tipElement.innerHTML = `<span>Подсказка</span>: загаданное число меньше ${playerAnswer.value}` :
    tipElement.innerHTML = `<span>Подсказка</span>: загаданное число больше ${playerAnswer.value}`
}

function game() {
    if (Number(playerAnswer.value) === randomNumber) {
        getVictoryMessage()
        tipElement.innerHTML = ``
        randomNumber = getRandomNumber(min, max)
        incrementScore()
    } else {
        getTip()
    }
}

checkButton.onclick = () => {
    game()
}
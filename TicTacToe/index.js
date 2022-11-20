let playerChoice = document.querySelector(".player-choice")
let gameContainer = document.querySelector(".game-container")
let replayChoice = document.querySelector(".replay-choice")

let winnerGame = replayChoice.querySelector('.replay-player')
let replayButton = replayChoice.querySelector('.replay-click')

let showHideChoice = document.querySelector('.show-hide-choice')
let showHideGame = document.querySelector('.show-hide-game')
let showHideReplay = document.querySelector('.show-hide-replay')

let allBox = document.querySelectorAll('.game-board div')

let players = document.querySelector(".player-tour")
let playerX = playerChoice.querySelector(".player-x")
let playerO = playerChoice.querySelector(".player-o")

let array = []
let stop = []
let bool = false

window.onload = () => {

    for(let i = 0; i < allBox.length; i++){
        allBox[i].setAttribute('onClick','clickedBox(this)')
        if(allBox[i].childElementCount == 0){
            array.push(i)
        }
    }

    playerX.onclick =() =>{
        showHideChoice.classList.add('hiden')
        showHideGame.classList.remove('hiden')
    }

    playerO.onclick =() =>{
        showHideChoice.classList.add('hiden')
        showHideGame.classList.remove('hiden')
        players.setAttribute("class", "player-tour active player")
    }
}

let playerName
let executeRule = true

function clickedBox(element){
    playerName = "X"
    let numbers
    if(players.classList.contains("player")){
        element.innerHTML = `O`
        players.classList.add('actives')
        playerName = "O"
        element.setAttribute("id", playerName)
        stop.push(Number(element.className[0]))
        element.style.pointerEvents = "none"
    }else{
        element.innerHTML = `X`
        players.classList.add('active')
        element.setAttribute("id", playerName)
        stop.push(Number(element.className[0]))
        element.style.pointerEvents = "none"
    }

    selectWinner()
    element.style.pointerEvents = 'none'
    let randomTime = ((Math.random() * 1000) + 200).toFixed()
    setTimeout(() => {
        twoScroll(executeRule)
    }, randomTime)
}

function twoScroll(executeRule) {

    if(executeRule){
       playerName = "O"
       let randomBox = array[Math.floor(Math.random() * array.length)]

       if(!stop.includes(randomBox)){
           if(players.classList.contains("player")){
               allBox[randomBox].innerHTML = "X"
               players.classList.remove('actives')
               playerName = "X"
               allBox[randomBox].setAttribute("id", playerName)
               stop.push(randomBox)
               allBox[randomBox].style.pointerEvents = "none"
           }else{
               allBox[randomBox].innerHTML = "O"
               players.classList.remove('active')
               allBox[randomBox].setAttribute("id", playerName)
               stop.push(randomBox)
               allBox[randomBox].style.pointerEvents = "none"
           }
           selectWinner()
           if(bool == true){
               showHideGame.classList.add('hiden')
               showHideReplay.classList.remove('hiden')
               winnerGame.innerHTML = `Player <p>${playerName}</p> won the game`
           }
       }else{
           if(stop.length != array.length){
               twoScroll(executeRule)
           }
           else{
               if(bool == true){
                   showHideGame.classList.add('hiden')
                   showHideReplay.classList.remove('hiden')
                   winnerGame.innerHTML = `Player <p>${playerName}</p> won the game`
               }else{
                   showHideGame.classList.add('hiden')
                   showHideReplay.classList.remove('hiden')
                   winnerGame.innerHTML = "Match has been drawn"
               }
           }
       }
    }
    
}

function getClass(idName){
    return document.querySelector(".box" + idName).id
}

function checkClass(val1, val2, val3, sign){
    if(getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign){
        return true
    }
}

function selectWinner(){
    if(checkClass(1,2,3,playerName) || checkClass(4,5,6,playerName) ||checkClass(7,8,9,playerName) || checkClass(1,4,7,playerName) || checkClass(2,5,8,playerName) || checkClass(3,6,9,playerName) || checkClass(1,5,9,playerName) || checkClass(3,5,7,playerName)){
        bool = true
        executeRule = false
        twoScroll(executeRule)

        showHideGame.classList.add('hiden')
        showHideReplay.classList.remove('hiden')
        winnerGame.innerHTML = `Player <p>${playerName}</p> won the game`
    }
}
replayButton.onclick = () => {
    window.location.reload()
}
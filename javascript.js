const Gameboard = (() => {
    let gameboard = [];
    const board = document.querySelector(".game-container")
    const restartButton = document.querySelector(".restart")

    let gameflow = {
        currentPlayer: "",
        playNumber: 0,
        gamemode: ""
    }

    let p1
    let p2


    const gamemodeMode = document.getElementById("gamemodeForm") 
    const gameNames = document.getElementById("namesForm") 

    gamemodeMode.addEventListener("submit", function (e) {
        e.preventDefault()
        // console.log(e.submitter.value)
        gamemodeMode.classList.add("form-hide")
        
        if (e.submitter.value == "single") {
            gameflow.gamemode = "single"

            p1 = playerFactory("User", 0, "X")
            p2 = playerFactory("Computer", 0, "O")

            displayData(p1, p2)
            startGame()
        } else if (e.submitter.value == "multi") {
            gameflow.gamemode = "multi"
            gameNames.classList.remove("form-hide")
            
            gameNames.addEventListener("submit", function (e) {
                e.preventDefault()

                gameNames.classList.add("form-hide")

                let formNames = document.querySelectorAll("#namesForm input")
                p1 = playerFactory(formNames[0].value, 0, "X")
                p2 = playerFactory(formNames[1].value, 0, "O")
            //    console.log("This is really wird", p1, p2)

               displayData(p1, p2)
               startGame()
            })
        }

    })

    const gameDivHandler = (event) => {
        gameDiv = event.target;
        let i = parseInt(gameDiv.getAttribute("data-number"))
        if (gameDiv.getAttribute("data-section") == "true") {

            gameflow.currentPlayer = gameflow.currentPlayer == p1? p2: p1;

            gameDiv.firstChild.textContent = `${gameflow.currentPlayer.symbol}`      
            gameboard[i] = gameflow.currentPlayer.symbol

            gameDiv.setAttribute("data-section", false)
            gameflow.playNumber++
            let winner = decideWinner(gameboard)

            if (winner != "tie") {
                displayWinner(`${gameflow.currentPlayer.name} has won this game!`)
                gameflow.currentPlayer.addWin()
                updateData(p1,p2)
            } else if (gameflow.playNumber == 9) {
                displayWinner("It's a tie!")
            }

            if (gameflow.gamemode == "single" && gameflow.currentPlayer == p1) {
                
                let uncheckedSections = document.querySelectorAll(`.game-section[data-section='true']`) 
                let ramdomMove = Math.floor(Math.random() * uncheckedSections.length)
                uncheckedSections[ramdomMove].click()
                
            }
        }
    }

    const startGame = ()  => {
        // console.log("this game has started")

        const gameContainer = document.querySelector("section.game")
        gameContainer.classList.add("game-active")

        for (let i = 0; i < 9; i++) {
            const gameDiv = document.createElement("div")
            gameDiv.classList.add("game-section")
            gameDiv.setAttribute("data-section", true)
            gameDiv.setAttribute("data-number", i)
            gameDiv.innerHTML = `<span class="symbol"></span>`
            board.appendChild(gameDiv)
            
            gameDiv.addEventListener("click", gameDivHandler)
        }
    }
    
    

    restartButton.addEventListener("click", function (params) {
        const gameSections = document.querySelectorAll(".game-section")
        const answerContainer = document.querySelector(".answer")
        const answer = document.getElementById("answer")

        gameboard = [];
        gameflow.playNumber = 0;
        gameflow.currentPlayer = "";
        answerContainer.classList.remove("answer-active")
        answer.textContent = ""


        gameSections.forEach(section => {
            section.firstChild.textContent = ""
            section.setAttribute("data-section", true)
            

            section.addEventListener("click", gameDivHandler)
        })  

    })

    const decideWinner = (gameboard) => {

        let winner
        // console.log(gameboard)
    
        if ( gameboard[0] == gameboard[1] && gameboard[1] == gameboard[2] && gameboard[0] != undefined) {
            winner = "winner"
        } else if ( gameboard[3] == gameboard[4] && gameboard[4] == gameboard[5] && gameboard[3] != undefined) {
            winner = "winner"
        } else if ( gameboard[6] == gameboard[7] && gameboard[7] == gameboard[8] && gameboard[6] != undefined) {
            winner = "winner"
        } else if ( gameboard[0] == gameboard[3] && gameboard[3] == gameboard[6] && gameboard[0] != undefined) {
            winner = "winner"
        } else if ( gameboard[1] == gameboard[4] && gameboard[4] == gameboard[7] && gameboard[1] != undefined) {
            winner = "winner"
        } else if ( gameboard[2] == gameboard[5] && gameboard[5] == gameboard[8] && gameboard[2] != undefined) {
            winner = "winner"
        } else if ( gameboard[0] == gameboard[4] && gameboard[4] == gameboard[8] && gameboard[0] != undefined) {
            winner = "winner"
        } else if ( gameboard[2] == gameboard[4] && gameboard[4] == gameboard[6] && gameboard[2] != undefined) {
            winner = "winner"
        } else {
            winner = "tie";
        }
    
        return winner
    }

    const displayWinner = (winner) => {
        const answerContainer = document.querySelector(".answer")
        const answer = document.getElementById("answer")

        answer.textContent = winner;
        answerContainer.classList.add("answer-active")

        gameDivs = document.querySelectorAll(".game-section")
        gameDivs.forEach(gameDiv => {
            gameDiv.removeEventListener("click", gameDivHandler)
        });
    }

    return {
        gameboard
    }
})()

const playerFactory = (name, wins, symbol) => {

    const addWin = function () {  
        this.wins++
        return this.wins
    }

    return {
        name,
        wins,
        symbol,
        addWin
    }
}

const displayData = (player1, player2) => {
    const players = document.querySelectorAll("div.player-info")
    // console.log( players[0].children[0] )
    players[0].children[0].textContent = player1.name
    players[0].children[1].textContent = player1.wins
    players[1].children[0].textContent = player2.name
    players[1].children[1].textContent = player2.wins
}

const updateData = (player1, player2) => {
    const players = document.querySelectorAll("div.player-info")
    // console.log( players[0].children[0] )
    players[0].children[1].textContent = player1.wins
    players[1].children[1].textContent = player2.wins
}


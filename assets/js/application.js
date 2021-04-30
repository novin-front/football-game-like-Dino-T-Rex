
let containerGame = document.getElementById("container");
let dinosaur = document.getElementById("dino");
let block = document.querySelector(".block");
let footballField = document.getElementById("football-field");
let cloud = document.getElementById("cloud");
let gameStartCount = 0;
let timeinterval;
let gameCheckerInterval;
let gameRate = 0;
let gameTime = 60;
let minutes = (gameTime >= 60) && ((gameTime % 60) === 0) ? Math.floor(gameTime / 60) - 1 : Math.floor(gameTime / 60);
let seconds = ((gameTime % 60) === 0) ? (gameTime % 60) + 60 : gameTime % 60;
let secondString = (seconds <= 10) ? `0${minutes}` : minutes;
let minutString = (minutes <= 10) ? `0${minutes}` : minutes;

function upToDown(element) {
    $(element).addClass("dinoActive");
    console.log("%%%%%%% =>", parseInt(getComputedStyle(block).getPropertyValue("left")))
    setTimeout(() => {
        $(element).removeClass("dinoActive");
    }, 800);
}
function gameStarter() {
    gameStartCount++;
    $(".block").addClass("blockActive")
    // buildOpponentPlayer()

    $("#flag-start").addClass("start-flag")
    $("#football-field").addClass("fieldActive")
    $("#cloud").addClass("cloudActive")
}
function gameOver() {
    $(".custom-modal").fadeIn();
    $(".block").removeClass("blockActive")
    // $(".block").removeClass(function (index, className) {
    //     return (className.match (/(^|\s)blockActive\S+/g) || []).join(' ');
    // });
    $("#flag-start").removeClass("start-flag")
    $("#football-field").removeClass("fieldActive")
    $("#cloud").removeClass("cloudActive")
}

function generatRandomNumber(end) {
    return Math.floor(Math.random() * end)
}

function convertStringToArray(strings) {
    return strings.split("")
}

function convertArrayToString(array) {
    return array.join(",").replace(/,/g, "");
}

$(document).ready(function () {





    $("#dino").on("click", function () {
        upToDown(this);
    });
    $(document).on("keydown", function (event) {
        let keydown = event.key;
        // let dinoBottom = getComputedStyle(dinosaur).getPropertyValue("bottom")
        // let blockLeft = getComputedStyle(dinosaur).getPropertyValue("left")
        // console.log("dinoBottom =>", dinoBottom)
        // console.log("blockLeft =>", blockLeft)

        switch (keydown) {
            case "ArrowUp":
                upToDown("#dino");
                break
            case " ":
                upToDown("#dino");
                break
            default:
                break;
        }
    });
    $(".close-modal").on("click",function(){
        $(".custom-modal").fadeOut();
    })
    $("#start-game").on("click",function(){
        if (gameStartCount === 0) {
            $(".custom-modal").fadeOut();
            gameStarter()
            gameCheckerInterval = setInterval(checkGameOver, 10);
            timeinterval = setInterval(updateGameTime, 1000)
        } else {
            window.location.reload();
        }
    })

})
// function createkeyframes (name){
//     let style = `@-webkit-keyframes ${name} {
//         0% {
//           right:-${generatRandomNumber(100)}%;
//         }
//         100% {
//           right: 150%;
//         }
//       }`
//       return style;
// }
// function generateOpponentPlayerImage (){
//     let image = document.createElement("img");
//     image.src = `./assets/image/opposing-player-${generatRandomNumber(2)}.png`;
//     return image;
// }

// function buildOpponentPlayer(){
//     let block = document.createElement("div");
//     block.className = "block";
//     let keyframesName = "run-"+generatRandomNumber(1000)
//     block.style = createkeyframes(keyframesName);
//     // block.style = `animation: ${keyframesName} 3s  linear infinite;`
//     block.appendChild(generateOpponentPlayerImage());
//     document.querySelector("#container").appendChild(block);
// }

function buildOpponentPlayer() {
    $(".block").each(function (index) {
        $(this).addClass(`blockActive${index}`);
    })
}

function updateGameRate(valid) {
    if (valid === 0) {
        gameRate++;
        document.getElementById("game-rate").innerHTML = gameRate;
    }
}


let count = 0;

function checkGameOver() {

    let dinoBottom = parseInt(getComputedStyle(document.getElementById("dino")).getPropertyValue("bottom"))
    let blockLeft = parseInt(getComputedStyle(block).getPropertyValue("left"))
    if ((blockLeft > 1000)) {
        block.style = 'transform: rotate(0deg);'
    }
    if ((blockLeft >= 400 && blockLeft <= 500)) {
        block.style = 'transform: rotate(84deg);'
        count = 0;
    }

    if ((blockLeft <= 140) && (blockLeft >= 50) && (dinoBottom < 50)) {
        console.log("game over")
        clearInterval(timeinterval);
        clearInterval(gameCheckerInterval);
        gameOver()
    } else {
        // console.log("*** emtiz ****",count)

        if (blockLeft >= 50 && blockLeft < 100 && count === 0) {

            updateGameRate(count)
            count++;
        }

    }
}


function updateGameTime() {
    seconds--;
    let secondString = (seconds < 10) ? `0${seconds}` : seconds;
    let minutString = (minutes < 10) ? `0${minutes}` : minutes;
    document.getElementById("seconds").innerHTML = `${secondString}`;
    document.getElementById("minutes").innerHTML = `${minutString}`;
    gameTime--;
    if (gameRate === 30) {
        //youWin();
    }
    if (gameTime <= 0) {
        gameTimeChecker();
        clearInterval(timeinterval);
        clearInterval(gameCheckerInterval);
        gameOver()
    } else {
        if (seconds === 0) {
            seconds = 60;
            minutes--;
        }
    }
}

function gameTimeChecker() {
    if (gameTime > 0) {
        return true;
    }

}
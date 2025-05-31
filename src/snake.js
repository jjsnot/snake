//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//snake head
var snakeX = blockSize * 5
var snakeY = blockSize * 5

var velocityX = 0
var velocityY = 0

//snake body
var snakeBody = [];

//food
var foodX = blockSize * 10
var foodY = blockSize * 10

//gameOver
var gameOver = false

//count
var count = 0

//best score
let bestScoreDisplay;
let bestScore = localStorage.getItem("bestScore") || 0;
window.onload = function () {
    board = document.getElementById("board")
    board.height = rows * blockSize
    board.width = cols * blockSize
    context = board.getContext("2d")
    //best score
    bestScoreDisplay = document.getElementById("bestScore");
    bestScoreDisplay.textContent = bestScore;
    //reset button
    const resetbttn = document.getElementById("reset")
    resetbttn.addEventListener("click" , function (){
        localStorage.removeItem("bestScore");
        bestScore = 0;
        bestScoreDisplay.textContent = bestScore;
    })



    placeFood()
    bestScoreDisplay.textContent = bestScore;
    document.addEventListener("keydown" , ChangeDirection , {passive : false});
    //update();
    setInterval(update , 1000/10)
}
function setbestscore(){
    if (count > bestScore){
        localStorage.setItem("bestScore" , count)
    }
}
function incrementCounter(){
    let counter = document.getElementById("score")
    count++
    counter.textContent =count;
}
function update(){
    if(gameOver){
        return;
    }
    context.fillStyle = "black";
    context.fillRect(0 , 0 , board.width  , board.height)

    context.fillStyle = "red"
    context.fillRect(foodX ,foodY , blockSize , blockSize)

    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX , foodY])
        incrementCounter()
        placeFood();
    }
    for(let i = snakeBody.length - 1; i > 0 ;i--){
        snakeBody[i] = snakeBody[i -1]
    }
    if(snakeBody.length){
        snakeBody[0] = [snakeX , snakeY]
    }

    context.fillStyle = "lime"
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX , snakeY ,blockSize , blockSize )
    for(let i = 0 ; i < snakeBody.length ; i++){
        context.fillRect(snakeBody[i][0] , snakeBody[i][1] ,blockSize , blockSize )

        //game over conditions
        if(snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize){
            gameOver = true;
            setbestscore()
            alert("GAME OVER!\nYOUR SCORE IS " + count)
            location.reload();
        }
        for(let i = 0; i < snakeBody.length; i++){
            if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
                gameOver = true
                setbestscore()
                alert("GAME OVER!\nYOUR SCORE IS " + count)
                location.reload();
            }
        }
    }





}

function ChangeDirection(e){
    e.preventDefault();
    if(e.code == "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;

    }
    else if(e.code == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;

    }
    else if(e.code == "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;

    }
    else if(e.code == "ArrowRight" && velocityX != -1 ){
        velocityX = 1;
        velocityY = 0;

    }

}

function placeFood(){
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * cols) * blockSize;

}
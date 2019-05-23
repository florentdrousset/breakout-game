var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//keyboard
var rightPressed = false;
var leftPressed = false;

//ball
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var color = "#0095DD";
var ballRadius = 10;

//paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth) / 2;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    } else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
    }

    if(rightPressed) {
        paddleX += 7;
    }
    else if(leftPressed) {
        paddleX -= 7;
    }

    if(paddleX < 0) {
        paddleX= 0;
    }
    if(paddleX > canvas.width-paddleWidth) {
        paddleX = canvas.width-paddleWidth;
    }

    x += dx;
    y += dy;

}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}


var interval = setInterval(draw, 10);
console.log(interval);


var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;

var paddle1Y = 250;
var paddle2Y = 250;
const paddleWidth = 10;
const paddleHeight = 100;

var player1Score = 0;
var player2Score = 0;
const winScore = 3;

var showingWin = false;

window.onload = function() {
    canvas = document.getElementById('pongCanvas');
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;
    setInterval(function() {
        moveEverything();
        drawEverything();
    }, 1000/framesPerSecond);

    canvas.addEventListener('mousedown',  function(event) {
        if(showingWin) {
            player1Score = 0;
            player2Score = 0;
            showingWin = false;
        }
    })

    canvas.addEventListener('mousemove',  function(event) {
        var mousePosition = calculateMousePosition(event);
        paddle1Y = mousePosition.y - (paddleHeight/2);
    })
}

function moveEverything() {
    if(showingWin) {
        return;
    }

    computerMovement();
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if(ballX < 0+paddleWidth) {
        if(ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;

            var deltaY = ballY - (paddle1Y+paddleHeight/2);
            ballSpeedY = deltaY * 0.35;
        } else {
            player2Score++;
            resetBall();
        }
    }

    if(ballX > canvas.width - paddleWidth) {
        if(ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
            var deltaY = ballY - (paddle2Y+paddleHeight/2);
            ballSpeedY = deltaY * 0.35;
        } else {
            player1Score++;
            resetBall();
        }
    }

    if(ballY > canvas.height || ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }
}

function drawEverything() {
    canvasContext.font='30px arial';

    // draws the background
    rectangle(0,0, canvas.width, canvas.height, 'black');

    if(showingWin) {
        canvasContext.fillStyle = 'white';

        if(player1Score >= winScore) {
            canvasContext.fillText('You Won!', canvas.width/2-40, 200);
        } else if(player2Score >= winScore) {
            canvasContext.fillText('You Lost!', canvas.width/2-40, 200);
        }
        canvasContext.fillText('click to continue', canvas.width/2-90, 500);
        return;
    }

    // draws net
    drawNet();
    // draws the left player paddle
    rectangle(0,paddle1Y,paddleWidth,paddleHeight, 'white');
    // draws the right computer paddle
    rectangle(canvas.width-paddleWidth,paddle2Y,paddleWidth,paddleHeight, 'white');
    // draws the ball
    circle(ballX, ballY, 10, 'white');

    canvasContext.fillText(player1Score, 100, 100);
    canvasContext.fillText(player2Score, canvas.width-100, 100);
}

function circle(X,Y, radius, color) {
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(X, Y, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}

function rectangle(X,Y,width,height,color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(X,Y,width,height,color);
}

function calculateMousePosition(event) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = event.clientX - rect.left - root.scrollLeft;
    var mouseY = event.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}

function resetBall () {
    if(player1Score >= winScore || player2Score >= winScore) {
        showingWin = true;
    }

    ballSpeedX = -ballSpeedX;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}

function computerMovement() {
    var paddleCenter = paddle2Y + (paddleHeight/2);
    if(paddleCenter < ballY - 35) {
        paddle2Y += 6;
    } else if(paddleCenter > ballY + 35) {
        paddle2Y -= 6;
    }
}

function drawNet() {
    for(var i = 0; i < canvas.height; i+=40) {
        rectangle(canvas.width/2 - 1,i,2,20,'white');
    }
}

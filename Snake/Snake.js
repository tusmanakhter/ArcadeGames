var canvas;
var canvasContext;

var xVelocity = 0;
var yVelocity = 0;

var playerX = 10;
var playerY = 10;

var gridSize = 20;
var tileCount = 20;

var appleX = 15;
var appleY = 15;

var trail = [];
var tail = 5;

var xCurrentVelocity = 0;
var yCurrentVelocity = 0;

var score = 0;
var showingLose = false;

window.onload = function() {
    canvas = document.getElementById('snakeCanvas');
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 15;
    setInterval(function() {
        moveEverything();
        drawEverything();
    }, 1000/framesPerSecond);

    document.addEventListener('keydown',  keyPush);

    canvas.addEventListener('mousedown',  function(event) {
        if(showingLose) {
            reset();
        }
    })

    scoreText = document.getElementById("score");
}

function keyPush(event) {
    switch(event.keyCode) {
        case 37:
            xVelocity = -1;
            yVelocity = 0;
            break;
        case 38:
            xVelocity = 0;
            yVelocity = -1;
            break;
        case 39:
            xVelocity = 1;
            yVelocity = 0;
            break;
        case 40:
            xVelocity = 0;
            yVelocity = 1;
            break;
        case 32:
            reset();
            break;
    }
    
    if(xCurrentVelocity+xVelocity == 0 && xVelocity != 0) {
        xVelocity = xCurrentVelocity;
    } else {
        xCurrentVelocity = xVelocity;
    }

    if(yCurrentVelocity+yVelocity == 0 && yVelocity != 0) {
        yVelocity = yCurrentVelocity;
    } else {
        yCurrentVelocity = yVelocity;
    }
}

function moveEverything() {
    if(showingLose) {
        return;
    }

    playerX += xCurrentVelocity;
    playerY += yCurrentVelocity;
    if(playerX < 0) {
        playerX = tileCount - 1;
    }
    if(playerX > tileCount - 1) {
        playerX = 0;
    }
    if(playerY < 0) {
        playerY = tileCount - 1;
    }
    if(playerY > tileCount - 1) {
        playerY = 0;
    }
}

function drawEverything() {
    canvasContext.font='20px arial';

    // draws the background
    rectangle(0,0, canvas.width, canvas.height, 'black');

    if(showingLose) {
        canvasContext.fillStyle = 'white';
        canvasContext.fillText('You Lost!', canvas.width/2-40, 200);
        canvasContext.fillText('click to continue', canvas.width/2-90, 500);
        return;
    }

    // draws snake
    drawSnake();

    //draws apple
    drawApple();

    scoreText.innerHTML="Score: " + score;
}

function rectangle(X,Y,width,height,color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(X,Y,width,height,color);
}

function drawSnake() {
    for(var i = 0; i < trail.length; i++) {
        rectangle(trail[i].x*gridSize,trail[i].y*gridSize,gridSize-2,gridSize-2,'lime');
        if(trail[i].x == playerX && trail[i].y == playerY) {
            if (score > 0) {
                showingLose = true;
            }
            tail = 5;
            score = 0;
        }
    }
    trail.push({x:playerX, y:playerY});
    while(trail.length> tail) {
        trail.shift();
    }
}

function drawApple() {
    if (appleX == playerX && appleY == playerY) {
        tail++;
        score++;
        appleX = Math.floor(Math.random()*tileCount);
        appleY = Math.floor(Math.random()*tileCount);
    }
    rectangle(appleX*gridSize,appleY*gridSize,gridSize-2,gridSize-2,'red');
}

function reset() {
    xVelocity = 0;
    yVelocity = 0;
    playerX = 10;
    playerY = 10;
    gridSize = 20;
    tileCount = 20;
    appleX = 15;
    appleY = 15;
    trail = [];
    tail = 5;
    xCurrentVelocity = 0;
    yCurrentVelocity = 0;
    score = 0;
    showingLose = false;
}

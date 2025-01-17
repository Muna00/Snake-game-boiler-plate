let canvas;
let canvasContext;
let scoreSpan;
let circularWay;
let killedByHittingItself;
let snakeBodyDisappear;

let appleImage;
let bodyImage;
let headImage;
let apple_x;
let apple_y;

let apple = {
    x: 0,
    y: 0,
};

let snake = {
    x: [],
    y: [],
    size: 3
};

let leftDirection = false;
let rightDirection = true;
let upDirection = false;
let downDirection = false;
let inGame = true;    

const DELAY = 140;
const MAX_RAND = 29;
const CELL_SIZE = 10;
const CANVAS_WIDTH = 300; 
const CANVAS_HEIGHT = 300;
   
const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;
const DOT_SIZE=10;
const ALL_DOTS=200;

function init() {

    circularWay = document.getElementById('circular-way').checked;
    killedByHittingItself = document.getElementById('killed-by-hitting-itself').checked;
    snakeBodyDisappear = document.getElementById('snake-body-disappear').checked;

    if(circularWay) {
        // write the  code here
    }
    if(killedByHittingItself) {
        for(var i=1;i<this.x.length-1;i++)
        {

        }


        // write the  code here
    }
    if(snakeBodyDisappear) {
        // write the  code here
    }
    
    canvas = document.getElementById('myCanvas');
    canvasContext = canvas.getContext('2d');
    scoreSpan = document.getElementById("score");

   // head();
    loadImages();
    createInitialSnakePosition();
    locateApple();
    setTimeout("gameCycle()", DELAY);

}    

function loadImages() {   
    
    bodyImage = new Image();
    bodyImage.src = 'images/body.png'; 
    
    appleImage = new Image();
    appleImage.src = 'images/apple.png'; 

    headImage=new Image();
    headImage.src='images/head.png';
    
}


function doDrawing() {

    clearCanvas();

    if (inGame) {
        drawApple();
        drawSnake();
    } else {
        gameOver();
    }
}

function createInitialSnakePosition() {

    for (let z = 0; z < snake.size; z++) {
        snake.x[z] = 50 - z * CELL_SIZE;
        snake.y[z] = 50;
    }
}   

function clearCanvas() {
    canvasContext.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function drawApple() {
    canvasContext.drawImage(appleImage, apple.x, apple.y);
}

function drawSnake() {
    for (let z = 0; z < snake.size; z++){
  
    if (z==0)
   {
    canvasContext.drawImage(headImage,snake.x[z],snake.y[z]);
   }
else

    {
        canvasContext.drawImage(bodyImage, snake.x[z], snake.y[z]);
        
    }
}

}

function gameOver() {
    canvasContext.fillStyle = 'white';
    canvasContext.textBaseline = 'middle'; 
    canvasContext.textAlign = 'center'; 
    canvasContext.font = 'normal bold 18px serif';
    
    canvasContext.fillText('Game over', CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
}

function locateApple(){

    // var l=Math.floor(Math.random()*MAX_RAND);
    // apple.x=l *DOT_SIZE;

    // var l=Math.floor(Math.random()*MAX_RAND);
    // apple.y=l *DOT_SIZE;
    


}


function checkApple() {
    if(apple.x==snake.x[0] && apple.y==snake.y[0]){
        let randX=Math.floor((Math.random()*29)+ 1);
        let randY=Math.floor((Math.random()*29)+ 1);
        apple.x=randX*10;
        apple.y=randY*10;
        apple.size+=1;



    }
    // You have to check here whether the apple is eaten by the snake or not
}

function checkCollision() {

    if (snake.y[0] >= CANVAS_HEIGHT) {
        inGame = false;
    }

    if (snake.y[0] < 0) {
       inGame = false;
    }

    if (snake.x[0] >= CANVAS_WIDTH) {
      inGame = false;
    }

    if (snake.x[0] < 0) {
      inGame = false;
    }
}

onkeydown = function(e) {
    
    let key = e.keyCode;
    
    if ((key == LEFT_KEY) && (!rightDirection)) {
        
        leftDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == RIGHT_KEY) && (!leftDirection)) {
        
        rightDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == UP_KEY) && (!downDirection)) {
        
        upDirection = true;
        rightDirection = false;
        leftDirection = false;
    }

    if ((key == DOWN_KEY) && (!upDirection)) {
        
        downDirection = true;
        rightDirection = false;
        leftDirection = false;
    }        
}  

function move() {

    for (let z = snake.size; z > 0; z--) {
        snake.x[z] = snake.x[(z - 1)];
        snake.y[z] = snake.y[(z - 1)];
    }

    if (leftDirection) {
        snake.x[0] -= CELL_SIZE;
    }

    if (rightDirection) {
        snake.x[0] += CELL_SIZE;
    }

    if (upDirection) {
        snake.y[0] -= CELL_SIZE;
    }

    if (downDirection) {
        snake.y[0] += CELL_SIZE;
    }
}  

function gameCycle() {
    
    if (inGame) {

        checkApple();
        checkCollision();
        move();
        doDrawing();
        setTimeout("gameCycle()", DELAY);
    }
}

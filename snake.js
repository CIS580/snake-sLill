// Samuel Turner-Lill
// 9/8/16 11:56pm

/* Global variables */
var frontBuffer = document.getElementById('snake');
var frontCtx = frontBuffer.getContext('2d');
var backBuffer = document.createElement('canvas');
backBuffer.width = frontBuffer.width;
backBuffer.height = frontBuffer.height;
var backCtx = backBuffer.getContext('2d');
var oldTime = performance.now();
var gameOver = 0;
var score = 0;

var blackSquare = new Image();
var apple = new Image();
blackSquare.src = 'BlackSquare.png';
apple.src = 'Apple.png';

var appleTimer = 0;
var appleLocationX = [];
var appleLocationY = [];
var appleCount = 0;

var snakeFragmentsX = [];
var snakeFragmentsY = [];
snakeFragmentsX[0] = 0;
snakeFragmentsY[0] = 0;

var x = 0;
var y = 0;

var input = {
    up: false,
    down: false,
    left: false,
    right: false
}

/**
 * @function loop
 * The main game loop.
 * @param{time} the current time as a DOMHighResTimeStamp
 */
function loop(newTime) {
  var elapsedTime = newTime - oldTime;
  oldTime = newTime;

  update(elapsedTime);
  render(elapsedTime);

  // Flip the back buffer
  frontCtx.drawImage(backBuffer, 0, 0);

    // Run the next loop
  if (gameOver == 0)
  {
      window.requestAnimationFrame(loop);
  }
}

/**
 * @function update
 * Updates the game state, moving
 * game objects and handling interactions
 * between them.
 * @param {elapsedTime} A DOMHighResTimeStamp indicting
 * the number of milliseconds passed since the last frame.
 */
function update(elapsedTime) {

    // TODO: Spawn an apple periodically
    appleTimer = appleTimer + elapsedTime;
    if (appleTimer > 2000)
    {
        appleLocationX[appleCount] = Math.floor(Math.random() * 480);
        appleLocationY[appleCount] = Math.floor(Math.random() * 760);
        appleTimer = 0;
        appleCount = appleCount + 1;
    }
  // TODO: Grow the snake periodically (GROWS WHEN APPLE EATEN)
    // TODO: Move the snake
    if (input.up) {
        for (i = 0; i < snakeFragmentsX.length; i++)
        {
            snakeFragmentsY[i] -= 1;
        }
    }
    if (input.down) {
        for (i = 0; i < snakeFragmentsX.length; i++)
        {
            snakeFragmentsY[i] += 1;
        }
    }
    if (input.right) {
        for (i = 0; i < snakeFragmentsX.length; i++)
        {
            snakeFragmentsX[i] += 1;
        }
    }
    if (input.left) {
        for (i = 0; i < snakeFragmentsX.length; i++)
        {
            snakeFragmentsX[i] -= 1;
        }
    }
    // TODO: Determine if the snake has moved out-of-bounds (offscreen)
    if (snakeFragmentsX[0] < 0 || snakeFragmentsX[0] > 480 || snakeFragmentsY[0] < 0 || snakeFragmentsY[0] > 760) 
    {
        gameOver = 1;
     }
    // TODO: Determine if the snake has eaten an apple
    for (i = 0; i < appleCount; i++)
    {
        var xDifference = snakeFragmentsX[0] - appleLocationX[i];
        var yDifference = snakeFragmentsY[0] - appleLocationY[i];
        if((xDifference > -10 && xDifference < 10) && (yDifference > -10 && yDifference < 10))
        {
            score = score + 10;
            appleLocationX[i] = -1;
            
            var snakeLength = snakeFragmentsX.length;
            snakeFragmentsX[snakeLength] = snakeFragmentsX[snakeLength - 1];
            snakeFragmentsY[snakeLength] = snakeFragmentsY[snakeLength - 1] + 15;
        }
    }
  // TODO: Determine if the snake has eaten its tail
  // TODO: [Extra Credit] Determine if the snake has run into an obstacle
    frontCtx.clearRect(0, 0, backBuffer.width, backBuffer.height);
}

/**
  * @function render
  * Renders the current game state into a back buffer.
  * @param {elapsedTime} A DOMHighResTimeStamp indicting
  * the number of milliseconds passed since the last frame.
  */
function render(elapsedTime) {
  backCtx.clearRect(0, 0, backBuffer.width, backBuffer.height);

    // TODO: Draw the game objects into the backBuffer
  for (i = 0; i < snakeFragmentsX.length; i++)
  {
      backCtx.drawImage(blackSquare, snakeFragmentsX[i], snakeFragmentsY[i]);

  }
  for (j = 0; j < appleCount; j++)
  {
      if (appleLocationX[j] > -1)
      {
          backCtx.drawImage(apple, appleLocationX[j], appleLocationY[j]);
      }
  }

  if(gameOver == 1)
  {
      backCtx.fillStyle = "red";
      backCtx.font = "bold 25px Arial";
      backCtx.fillText("Game Over", 300, 240);
  }

  backCtx.fillStyle = "blue";
  backCtx.font = "16px Arial";
  backCtx.fillText(score, 20, 20);

}

window.onkeydown = function (event) {
    switch (event.keyCode) {
        //up
        case 38:
        case 87:
            input.up = true;
            y -= 1;
            break;

            //left
        case 37:
        case 65:
            input.left = true;
            x -= 1;
            break;

            //right
        case 39:
        case 68:
            input.right = true;
            x += 1;
            break;

            //down
        case 40:
        case 83:
            input.down = true;
            y += 1;
            break;
    }
}

window.onkeyup = function (event) {
    switch (event.keyCode) {
        //up
        case 38:
        case 87:
            input.up = false;
            break;

            //left
        case 37:
        case 65:
            input.left = false;
            break;

            //right
        case 39:
        case 68:
            input.right = false;
            break;

            //down
        case 40:
        case 83:
            input.down = false;
            break;
    }
}

/* Launch the game */
window.requestAnimationFrame(loop);

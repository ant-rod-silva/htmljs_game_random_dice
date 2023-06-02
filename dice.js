const canvas = document.getElementById('diceCanvas');
const context = canvas.getContext('2d');

const diceSize = 200;
const diceX = canvas.width / 2;
const diceY = canvas.height / 2;

let animationFrameId;
let animationCount = 0;
let finalNumber;

function drawDice(number) {
  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draw dice background
  context.fillStyle = '#ffffff';
  context.fillRect(diceX - diceSize / 2, diceY - diceSize / 2, diceSize, diceSize);
  context.strokeStyle = '#000000';
  context.strokeRect(diceX - diceSize / 2, diceY - diceSize / 2, diceSize, diceSize);

  // Draw dice dots
  const dotSize = diceSize / 10;

  context.fillStyle = '#000000';

  if (number === 1 || number === 3 || number === 5) {
    // Draw center dot
    context.beginPath();
    context.arc(diceX, diceY, dotSize / 2, 0, Math.PI * 2);
    context.closePath();
    context.fill();
  }

  if (number === 2 || number === 3 || number === 4 || number === 5 || number === 6) {
    // Draw top-left dot
    context.beginPath();
    context.arc(diceX - diceSize / 4, diceY - diceSize / 4, dotSize / 2, 0, Math.PI * 2);
    context.closePath();
    context.fill();

    // Draw bottom-right dot
    context.beginPath();
    context.arc(diceX + diceSize / 4, diceY + diceSize / 4, dotSize / 2, 0, Math.PI * 2);
    context.closePath();
    context.fill();
  }

  if (number === 4 || number === 5 || number === 6) {
    // Draw top-right dot
    context.beginPath();
    context.arc(diceX + diceSize / 4, diceY - diceSize / 4, dotSize / 2, 0, Math.PI * 2);
    context.closePath();
    context.fill();

    // Draw bottom-left dot
    context.beginPath();
    context.arc(diceX - diceSize / 4, diceY + diceSize / 4, dotSize / 2, 0, Math.PI * 2);
    context.closePath();
    context.fill();
  }

  if (number === 6) {
    // Draw top dot
    context.beginPath();
    context.arc(diceX, diceY - diceSize / 4, dotSize / 2, 0, Math.PI * 2);
    context.closePath();
    context.fill();

    // Draw bottom dot
    context.beginPath();
    context.arc(diceX, diceY + diceSize / 4, dotSize / 2, 0, Math.PI * 2);
    context.closePath();
    context.fill();
  }
}

function rollDiceAnimation() {
  animationCount++;
  drawDice(Math.floor(Math.random() * 6) + 1);

  if (animationCount < 30) {
    // Shake the dice for 30 frames
    animationFrameId = requestAnimationFrame(rollDiceAnimation);
  } else {
    // Stop the animation and display the final number
    cancelAnimationFrame(animationFrameId);
    drawDice(finalNumber);
  }
}

function rollDice() {
  // Reset animation count
  animationCount = 0;

  // Generate a random number
  finalNumber = Math.floor(Math.random() * 6) + 1;

  // Start the animation
  rollDiceAnimation();
}

// Call the rollDice() function to initially display a random number
rollDice();

// Add a click event listener to roll the dice on click
canvas.addEventListener('click', rollDice);
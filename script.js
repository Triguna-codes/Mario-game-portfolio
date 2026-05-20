/* ==== Task - 1 : SETUP VARIABLES ==== */
/* =====GET PLAYER FROM HTML ===== */
const player = document.getElementById('player'); /* HINT: player id */
/* ===== POSITION VARIABLES ===== */
let x = 100; /* Player's left position */
let y = 0; /* Player's up/down position */
/* ===== MOVEMENT VARIABLES ===== */
let velocityY = 0; /* HINT: How fast falling (0) */
let moveLeft = false; /* HINT: Is player moving left? (true/false) */
let moveRight = false; /* HINT: Is player moving right? (true/false) */
let jumping = false; /* HINT: Is player jumping? (true/false) */

/* ===== GAME VARIABLES ===== */
let score = 0; /* How many coins collected */
let gameCompleted = false; /* HINT: Did player win? (true/false) */
/* ===== TIMING VARIABLES ===== */
let lastSpaceTime = 0; /* Last time space was pressed */
const DOUBLE_PRESS_DELAY = 300; /* Time between double presses (ms) */

/* ==== Task - 2 : START GAME FUNCTION ==== */
/* ===== WHEN PLAYER CLICKS START ===== */
function startGame() { /* HINT: define startGame funtion */
/* HIDE START SCREEN */
document.getElementById('start').style.display = 'none';
requestAnimationFrame(gameLoop); /* HINT: start game loop */
}


/* ==== Task - 3 : SUBMIT FORM FUNCTION ==== */
/* ===== WHEN PLAYER SUBMITS FORM ===== */
function submitForm() {
alert('🚀 FORM SUBMITTED SUCCESSFULLY !'); /* HINT: "Success Message" */
closePopup(); /* HINT: call closePopup function to hide form */ 
}

function closePopup() {
document.getElementById('contactPopup').style.display = 'none'; /* HINT: 'none' to hide form */
}

/* ==== Task - 4 : KEYBOARD EVENTS ==== */
/* ===== WHEN KEY IS PRESSED DOWN ===== */
document.addEventListener('keydown', e => {

/* ===== RIGHT ARROW KEY ===== */
if (e.key === 'ArrowRight' || e.key === 'd') { /* HINT: 'ArrowRight' or 'd' */
moveRight = true; /* HINT: true/false */
}
/* ===== LEFT ARROW KEY ===== */
if (e.key === 'ArrowLeft' || e.key === 'a') {
moveLeft = true; /* HINT: true/false */
}
/* ===== SPACEBAR TO JUMP ===== */
if (e.key === ' '|| e.key ==='ArrowUp') { /* HINT: space key pressed */
    e.preventDefault(); /* Prevent default spacebar scrolling */
    const now = Date.now(); /* Current time in milliseconds */
    if (!jumping) { /* HINT: check if not already jumping */
velocityY = 18; /* Move UP (negative = up) */
jumping = true; /* HINT: true/false */
}
if (now - lastSpaceTime < DOUBLE_PRESS_DELAY) { /* HINT: check for double press */
velocityY = 24; /* Move UP higher */
}
lastSpaceTime = now; /* Update last space press time */
}
}
);
/* ===== WHEN KEY IS RELEASED ===== */
document.addEventListener('keyup', e => {
/* ===== RIGHT ARROW KEY RELEASED ===== */
if (e.key === 'ArrowRight' || e.key === 'd') { /* HINT: 'ArrowRight' or 'd' */
moveRight = false; /* HINT: false */
}
/* ===== LEFT ARROW KEY RELEASED ===== */
if (e.key === 'ArrowLeft' || e.key === 'a') { /* HINT: 'ArrowLeft' or 'a' */
moveLeft = false; /* HINT: false */

}
});

/* ==== Task - 5 : PARTICLE EFFECTS ==== */
/* ===== CREATE FLOATING PARTICLES ===== */
function createParticles(originX, originY) { /* HINT: function name to createParticles */
/* CREATE 10 PARTICLES */
for (let i = 0; i < 8; i++) { /* HINT: mention start, end
and interval values */
/* CREATE NEW ELEMENT */
let p = document.createElement('div');
/* ADD CSS CLASS */
p.classList.add('particle');
/* POSITION PARTICLE */
p.style.left = originX + 'px'; /* HINT: mention units */
p.style.top = originY + 'px'; /* HINT: mention units */
// Random drift direction displacement
let driftX = (Math.random() - 0.5) * 50;
let driftY = (Math.random() - 0.5) * 50;

document.getElementById('world').appendChild(p); /* HINT: add to game container */

p.animate([
{ transform: `translate(0, 0)`, opacity: 1 },
{ transform: `translate(${driftX}px, ${driftY}px)`, opacity: 0 }
], {duration: 800, fill: 'forwards'});/* REMOVE AFTER 1 SECOND */
setTimeout(() => {
p.remove();
}, 800);
}
}

/* ==== Task - 6 : MAIN GAME LOOP ==== */
/* ===== MAIN GAME LOOP ===== */

function gameLoop() {
/* ONLY RUN IF GAME NOT COMPLETED */
if (!gameCompleted) { /*HINT : game will run only if gameCompleted
variable is false */
/* ===== MOVEMENT ===== */
/* MOVING RIGHT */
if (moveRight) { /* variable that hold access to
move right */
x += 8; /* Move RIGHT 8 pixels */
player.style.transform = 'scaleX(1)'; /* Face RIGHT */
}
/* MOVING LEFT */
if (moveLeft) { /* variable that hold access to
move left */
x -= 8; /* Move LEFT 8 pixels */
player.style.transform = 'scaleX(-1)'; /* Face LEFT */
}
/* NOT MOVING */
if (!moveRight && !moveLeft) { /* variable that hold access to
move left or right */
player.classList.remove('walk');
}
/* BOUNDARY CHECK */
if (x < 0) x = 0; /* Don't go left of screen */


//Ground lock constraint configuration
const groundLevel = window.innerHeight - 120 - 90;
if (jumping || y > 0) { /* HINT: check if jumping or above ground */
velocityY -= 1.1;
y += velocityY;
}
if (y <= 0) {
    y= 0;
    velocityY = 0;
    jumping = false;
}
let currentTopPosition = groundLevel - y; /* HINT: calculate current top position based on y */

/* ===== DRAW PLAYER ON SCREEN ===== */
player.style.left = x + 'px'; /* HINT: join units */
player.style.top = currentTopPosition + 'px'; /* HINT: join
units */

/* ===== CAMERA FOLLOW ===== */
let cameraX = x - 200;
if (cameraX < 0) cameraX = 0; /* Don't scroll left of level */
document.getElementById('world').style.transform = `translateX(${-cameraX}px)`; /* HINT: join units */

/* ===== COIN COLLECTION ===== */
document.querySelectorAll('.coin').forEach(coin => {
/* ONLY CHECK IF COIN IS VISIBLE */
if (coin.style.display !== 'none') { /* HINT: 'none' */
/* GET COIN POSITION */
let cx = coin.offsetLeft;
let cy = coin.offsetTop;
/* CHECK IF PLAYER TOUCHED COIN */
if (
x + 50 > cx &&
x < cx + 30 &&
currentTopPosition + 90 > cy &&
currentTopPosition < cy + 30
) {
coin.style.display = 'none'; /* HINT: 'none' */
score++; /* Add 1 to score */

/* UPDATE SCORE DISPLAY */
document.getElementById('coins').innerText = "COINS: " + score; /* HINT:
update 'score' value */
/* CREATE PARTICLES */
createParticles(cx + 15, cy + 15);
}
}
});

/* ===== ENEMY COLLISION ===== */
document.querySelectorAll('.enemy').forEach(enemy => {
let ex = enemy.offsetLeft;
let ey = enemy.offsetTop;
/* CHECK IF PLAYER HIT ENEMY */
if (
x + 45 > ex &&
x < ex + 35 &&
currentTopPosition + 90 > ey &&
currentTopPosition < ey + 40
) {
    gameCompleted = true; /* HINT: true/false */
alert('💀 Game Over! Try again.'); /* HINT : Failure message */
location.reload(); /* Refresh page */
}
});

/* ===== WIN CONDITION ===== */
const flag = document.getElementById('flag');
if(flag){
const flagPosition = flag.offsetLeft;
/* IF PLAYER REACHES FLAG WITH ALL COINS */
if (
x >= flagPosition - 40 &&
score >= 5
) {
gameCompleted = true; /* HINT: true/false */
moveLeft = false; /* HINT: true/false */

moveRight = false; /* HINT: true/false */
/* SHOW CONTACT FORM */
document.getElementById('contactPopup').style.display = 'flex';
/* HINT: 'flex' to show/ 'none' to hide */
}
}
}
/* LOOP FOREVER */
requestAnimationFrame(gameLoop);
}

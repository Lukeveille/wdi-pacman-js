// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4;

// Define your ghosts here
var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false,
}
var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false,
}
var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false,
}
var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false,
}

var ghosts = [inky, blinky, pinky, clyde]

function eatGhost(ghost) {
  if (ghost.edible) {
    console.log('\n' +  ghost.name + ' is feeling ' + ghost.character + '!');
    score += 200;
    ghost.edible = false;
  } else {
    loseLife();
  }
}

function eatPowerPellet() {
  score += 50;
  powerPellets -= 1;
  for (let i = 0; i < ghosts.length; i++) {
    ghosts[i].edible = true;
  }
}

function loseLife() {
  if (lives > 0) {
    console.log('\nYou lost a life!');
    lives -= 1;
  } else {
    console.log('\nYou died! :(');
    process.exit();
  }
}

// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function displayEdible(ghost) {
  if (ghost.edible) {
    return '(edible)';
  } else {
    return '(inedible)';
  }
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives + '\n\n\nPower Pellets: ' + powerPellets);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  if (powerPellets > 0) {
    console.log('(p) Eat Power-Pellet');
  }
  for (let i = 0; i < 4; i++) {
    console.log('(' + (i + 1) + ') Eat ' + ghosts[i].name + ' ' + displayEdible(ghosts[i]));
  }
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}


// Process Player's Input
function processInput(key) {
  switch(true) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case key === 'q':
      process.exit();
      break;
    case key ==='p':
      if (powerPellets > 0) {
        eatPowerPellet();
        console.log('\nChomp!');
      } else {
        console.log('\nNo Power-Pellets left!');
      }
      break;
    case key > 0 && key < 5:
      eatGhost(ghosts[key-1])
      break;
    case key === 'd':
      eatDot();
      break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 800); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});

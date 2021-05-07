var joinedText =
  "So the little prince tamed the fox. And when the hour of his departure drew near... “Ah,” said the fox, “I shall cry.” “It is your own fault,” said the little prince. “I never wished you any sort of harm; but you wanted me to tame you...” “Yes, that is so,” said the fox.“But now you are going to cry!” said the little prince. “Yes, that is so,” said the fox. “Then it has done you no good at all!” “It has done me good,” said the fox, “because of the colour of the wheat fields.” And then he added: “Go and look again at the roses. You will understand now that yours is unique in all the world. Then come back to say goodbye to me, and I will make you a present of a secret.”";
var charSet;
var counters = [];

var posX;
var posY;
var tracking = 29;

var actRandomSeed = 0;

var drawOpacity = true;
var drawLines = true;
var drawEllipses = true;
var drawText = true;
var canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.style("z-index", "2");

  textFont("monospace", 20);
  noStroke();

  charSet = getUniqCharacters();
  for (var i = 0; i < charSet.length; i++) {
    counters[i] = 0;
  }

  countCharacters();
}

// inspired by the example in generative design by Benedikt Gross
function draw() {
  background(28, 22, 70);

  posX = 80;
  posY = 300;
  randomSeed(actRandomSeed);

  // iterate through all characters in the text and draw them
  for (var i = 0; i < joinedText.length; i++) {
    // find the index of the current letter in the character set
    var upperCaseChar = joinedText.charAt(i).toUpperCase();
    var index = charSet.indexOf(upperCaseChar);
    if (index < 0) continue;

    // calculate parameters for text image
    var charOpacity = 100;
    if (drawOpacity) {
      charOpacity = counters[index];
    }

    var my = map(mouseY, 50, height - 50, 0, 1);
    my = constrain(my, 0, 1);
    var charSize = counters[index] * my * 3;

    var mx = map(mouseX, 50, width - 50, 0, 1);
    mx = constrain(mx, 0, 1);
    var lineLength = charSize;
    var lineAngle = random(-PI, PI) * mx - HALF_PI;
    var newPosX = lineLength * cos(lineAngle);
    var newPosY = lineLength * sin(lineAngle);

    // draw elements
    push();
    translate(posX, posY);
    stroke(0, 137, 160, charOpacity);
    if (drawLines) {
      line(0, 0, newPosX, newPosY);
    }

    // draw elipse and text
    noStroke();
    fill(111, 90, 254, charOpacity * 4);
    if (drawEllipses) {
      ellipse(0, 0, charSize / 10, charSize / 10);
    }
    if (drawText) {
      fill(255, 255, 255, charOpacity * 5);
      text(joinedText.charAt(i), newPosX, newPosY);
    }
    pop();

    posX += textWidth(joinedText.charAt(i));
    if (posX >= width - 200 && upperCaseChar == " ") {
      posY += int(tracking * my + 30);
      posX = 80;
    }
  }
}

function getUniqCharacters() {
  var charsArray = joinedText.toUpperCase().split("");
  var uniqCharsArray = charsArray
    .filter(function(char, index) {
      return charsArray.indexOf(char) == index;
    })
    .sort();
  return uniqCharsArray.join("");
}

function countCharacters() {
  for (var i = 0; i < joinedText.length; i++) {
    // clean the text, make everything upperCase
    var index = charSet.indexOf(joinedText.charAt(i).toUpperCase());
    if (index >= 0) counters[index]++;
  }
}

function keyReleased() {
  if (key == "s" || key == "S") saveCanvas(gd.timestamp(), "png");

  if (key == "1") drawOpacity = !drawOpacity;
  if (key == "2") drawLines = !drawLines;
  if (key == "3") drawEllipses = !drawEllipses;
  if (key == "4") drawText = !drawText;
}

// making the sketch responsive
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

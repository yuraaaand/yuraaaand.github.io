var canvas;


var w = window.innerWidth;
var h = window.innerHeight;  

var alphabet = "ABCČĆDĐEFGHIJKLMNOPQRSŠTUVWXYZŽabcčćdđefghijklmnopqrsštuvwxyzžАБВГҐДЂЕЁЄЖЗЅИІЇЙЈКЛЉМНЊОПРСТЋУЎФХЦЧЏШЩЪЫЬЭЮЯабвгґдђеёєжзѕиіїйјклљмнњопрстћуўфхцчџшщъыьэюяĂÂÊÔƠƯăâêôơư1234567890‘?’“!”(%)[#]{@}/&\<-+÷×=>®©$€£¥¢:;,.*";
var counters = [];
var joinedText;// = "And now here is my secret, a very simple secret: It is only with the heart that one can see rightly; what is essential is invisible to the eye. What is essential is invisible to the eye, the little prince repeated, so that he would be sure to remember. It is the time you have wasted for your rose that makes your rose so important.";
var fontRegularMono;

// function preload() {
//     // fontRegularMono = loadFont('fonts/IBMPlexMono-Regular.ttf');
//     joinedText = loadStrings('texts/thelittleprince.txt');
// }

// function setup() {
//   canvas = createCanvas(windowWidth, windowHeight);
//   canvas.style('z-index', '0');
// //   joinedText = joinedText.replace(/\s+/g, '');
//   console.log(joinedText);
//   for (var i = 0; i<alphabet.length; i++) {
//     counters[i] = 0;
//   }
//   countCharacters();
// }

// function countCharacters(){
//   for (var i = 0; i< joinedText.length; i++) {
//     var c = joinedText.charAt(i);
//     var upperCaseChar = c.toUpperCase();
//     var index = alphabet.indexOf(upperCaseChar);
//     if (index >= 0) counters[index]++;  
//   } 
// }

// function draw() {
//   background(255,255,0,1);

//   posX = 20;
//   posY = 40;

//   for (var i = 0; i< joinedText.length; i++) {
//       var upperCaseChar = joinedText.charAt(i).toUpperCase();
//       var index = alphabet.indexOf(upperCaseChar);
//       if (index < 0) continue;

//       fill(87,35,129, counters[index] * 3);


//       var sortY = index * 20 + 40;
//       var m = map(mouseX, 50, width - 50, 0, 1);
//       m = constrain(m, 0, 1);
//       var interY = lerp(posY, sortY, m);

//       text(joinedText.charAt(i), posX, interY);

//       posX += textWidth(joinedText.charAt(i));
//       if (posX >= width - 200 && upperCaseChar == " ") {
//         posY += 30;
//         posX = 20;
//       }
//   }
// }

var joinedText;
var charSet;
var counters = [];

var posX;
var posY;
var tracking = 29;

var actRandomSeed = 0;

var drawAlpha = true;
var drawLines = true;
var drawEllipses = true;
var drawText = true;

function preload() {
  joinedText = loadStrings('assets/js/thelittleprince.txt');
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('z-index', '0');
  colorMode(HSB, 360, 100, 100, 100);

  textFont('monospace', 20);
  noStroke();

  joinedText = joinedText.join(joinedText, ' ');
  charSet = getUniqCharacters();
  for (var i = 0; i < charSet.length; i++) {
    counters[i] = 0;
  }

  countCharacters();
}

function draw() {
  background(360);

  posX = 80;
  posY = 300;
  randomSeed(actRandomSeed);

  // go through all characters in the text to draw them
  for (var i = 0; i < joinedText.length; i++) {
    // again, find the index of the current letter in the character set
    var upperCaseChar = joinedText.charAt(i).toUpperCase();
    var index = charSet.indexOf(upperCaseChar);
    if (index < 0) continue;

    // calculate parameters
    var charAlpha = 100;
    if (drawAlpha) {
      charAlpha = counters[index];
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
    stroke(273, 73, 51, charAlpha);
    if (drawLines) {
      line(0, 0, newPosX, newPosY);
    }
    noStroke();
    fill(52, 100, 71, charAlpha);
    if (drawEllipses) {
      ellipse(0, 0, charSize / 10, charSize / 10);
    }
    if (drawText) {
      fill(0, charAlpha);
      text(joinedText.charAt(i), newPosX, newPosY);
    }
    pop();

    posX += textWidth(joinedText.charAt(i));
    if (posX >= width - 200 && upperCaseChar == ' ') {
      posY += int(tracking * my + 30);
      posX = 80;
    }
  }
}

function getUniqCharacters() {
  var charsArray = joinedText.toUpperCase().split('');
  var uniqCharsArray = charsArray.filter(function(char, index) {
    return charsArray.indexOf(char) == index;
  }).sort();
  return uniqCharsArray.join('');
}

function countCharacters() {
  for (var i = 0; i < joinedText.length; i++) {
    // get one character from the text and turn it to uppercase
    var index = charSet.indexOf(joinedText.charAt(i).toUpperCase());
    // increacre the respective counter
    if (index >= 0) counters[index]++;
  }
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (key == '1') drawAlpha = !drawAlpha;
  if (key == '2') drawLines = !drawLines;
  if (key == '3') drawEllipses = !drawEllipses;
  if (key == '4') drawText = !drawText;
}


function windowResized() {  
  resizeCanvas(windowWidth, windowHeight);
}
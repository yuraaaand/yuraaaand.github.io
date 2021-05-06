
var shapes;
var img;

function preload() {
  img = loadImage('data/smiley.png');

  shapes = [];
  shapes.push(loadImage('data/056.svg'));
  shapes.push(loadImage('data/076.svg'));
  shapes.push(loadImage('data/082.svg'));
  shapes.push(loadImage('data/096.svg'));
  shapes.push(loadImage('data/117.svg'));
  shapes.push(loadImage('data/148.svg'));
  shapes.push(loadImage('data/152.svg'));
  shapes.push(loadImage('data/157.svg'));
  shapes.push(loadImage('data/164.svg'));
  shapes.push(loadImage('data/166.svg'));
  shapes.push(loadImage('data/186.svg'));
  shapes.push(loadImage('data/198.svg'));
  shapes.push(loadImage('data/224.svg'));
}

function setup() {
  createCanvas(600, 900);
  image(img);
}

function draw() {
  background(255);

  for (var gridX = 0; gridX < img.width; gridX++) {
    for (var gridY = 0; gridY < img.height; gridY++) {
      // grid position + title size
      var titleWidth = 603 / img.width;
      var titleHeight = 873 / img.height;
      var posX = titleWidth * gridX;
      var posY = titleHeight * gridY;

      // get current color
      img.loadPixels();
      var c = img.get(min(gridX, img.width - 1), gridY);
      // greyscale conversion
      var greyscale = round(red(c) * 0.222 + green(c) * 0.707 + blue(c) * 0.071);
      var gradientToIndex = round(map(greyscale, 0, 255, 0, shapes.length - 1));
      image(shapes[gradientToIndex], posX, posY, titleWidth, titleHeight);
    }
  }
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}

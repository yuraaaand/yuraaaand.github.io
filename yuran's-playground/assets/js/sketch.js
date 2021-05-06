var canvas;

function setup() {
    canvas = createCanvas(0.2*windowWidth, 0.4*windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '0');
  }

function draw() {
  background(255,255,255,0);
  flower();
}

function flower() {
  
  push();
  fill('#DB00FF'); //235, 194, 204, 240);
  translate(0.1*windowWidth, 0.2*windowHeight);
  noStroke();

  for (var r2 = 0; r2 < 10; r2++) {
    if (frameCount <= 600) {
      ellipse(0, 10 + frameCount / 20, 10 + frameCount / 40, 20 + frameCount / 20);
    }
    if (frameCount > 600) {
      ellipse(0, 40, 25, 50)
    }
    rotate(PI / 5);
  }
  pop();
}

function windowResized() {  
  resizeCanvas(0.5*windowWidth, 0.5*windowHeight);
}
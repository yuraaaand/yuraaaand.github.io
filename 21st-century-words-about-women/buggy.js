var wws = [];
var wws4 = [];
var words = [];
var others = [];
var others4 = [];

var data;
var count;
var url2001 = 'data/data2001.json';
var max_size = 0;
var slider, sliderLabel;
var r;
var w = 400;
var conWidth = 1000; //full wordCloud's position
var conHeight = 900;
var conWidth4 = 340; //cat 4 position
var conHeight4 = 400;
var buttonshow;
var buttonhide;
var buttonclose;

var hider4 = [20, 50, 300, 300, 100];
var recarr = [ hider4];

var win;
var winarr = [win];



function preload() {
  data = loadJSON(url2001);
  console.log(typeof(data[0]));
}

function setup() {
  
  var canvas = createCanvas(windowWidth - 50, windowHeight*20);
  win = [0, 0, windowWidth- 50, windowHeight*20];
  canvas.position(50, 70);
  // background(0);
  
  buttonshow = createButton('show detail');
  buttonshow.position(19, 19);
  buttonshow.mousePressed(showDetail);
  
  buttonhide = createButton('hide detail');
  buttonhide.position(200, 19);
  buttonhide.mousePressed(hideDetail);
  
  buttonhide = createButton('close');
  buttonhide.position(600, 19);
  buttonhide.mousePressed(closeWindow);

  count = Object.keys(data).length;
  for (var i = 0; i < count; i++) {
    if (data[i].size > max_size) {
      max_size = data[i].size;
    }
  }
  var minW = 134 * pow(2.72, count * 0.005); // y = 134*e^(0.004*x)

    r = 130;
    drawCloudDetail();
    r = 300;
    drawCloud();
}


function showDetail() {
  recarr = [];
}

function hideDetail() {
  recarr.push(hider4);
}

function closeWindow() {
  winarr = [];
}

function draw() {
  for (var i = 0; i < wws4.length; i++) {
    wws4[i].render();
  }
  for (var i = 0; i < wws.length; i++) {
    wws[i].render();
  }
  for (var i = 0; i < recarr.length; i++) {
    fill(48,45,80);
    rect(recarr[i][0], recarr[i][1], recarr[i][2], recarr[i][3], recarr[i][4]);
  }
  for (var i = 0; i < winarr.length; i++) {
    fill(38,35,70);
    rect(winarr[i][0], winarr[i][1], winarr[i][2], winarr[i][3]);
  }
  
}



function drawCloudDetail() {
   console.log("detail");

  for (var i = 0; i < count; i++) {
    if (data[i].cat == "4") {

      var tries = 0;
      do {
        if (tries == 1000) {
          console.log("gave up at '" + data[i].text + "'");
          break;
        }
        tries++;
        var size = (data[i].size / max_size) * 40 + 10;
        size = map(size, 0, 100, 8, 40);
        textSize(size);
        var tWidth = textWidth(data[i].text);
        var x = random(-r, r - tWidth);
        var d = floor(sqrt(pow(r, 2) - pow(x, 2))); // x^2 + y^2 < r^2
        var y = random(-d + size, d);
        var circleCond1 = (pow(x + tWidth, 2) + pow(y - size, 2)) < pow(r, 2);
        var circleCond2 = (pow(x + tWidth, 2) + pow(y, 2)) < pow(r, 2);
        var circleCond = circleCond1 && circleCond2;
        //var x = random(-r*3, r*3 - tWidth);
        var d = floor(sqrt(pow(r, 2) - pow(x, 2))); // x^2 + y^2 < r^2
      } while (!circleCond || (others4.length > 0 && isOverlapping(x, y, data[i], others4)));

      words[i] = new Word(x, y, data[i]);
      wws4.push(new WW4(x, y, data[i]));
      words[i].size = map(words[i].size, 0, 100, 8, 40);
      others4.push(words[i]);
    }
  }
}







function drawCloud() {
 console.log("cloud");
  for (var i = 0; i < count; i++) {
    var tries = 0;
    do {
      if (tries == 1000) {
        console.log("gave up at '" + data[i].text + "'");
        break;
      }
      tries++;
      var size = (data[i].size / max_size) * 40 + 10;
      size = map(size, 0, 100, 8, 40);
      textSize(size);
      var tWidth = textWidth(data[i].text);
      var x = random(-r, r - tWidth);
      var d = floor(sqrt(pow(r, 2) - pow(x, 2))); // x^2 + y^2 < r^2
      var y = random(-0.6 * d + size, 0.6 * d);
      var circleCond1 = (pow(x + tWidth, 2) + pow(y - size, 2)) < pow(r, 2);
      var circleCond2 = (pow(x + tWidth, 2) + pow(y, 2)) < pow(r, 2);
      var circleCond = circleCond1 && circleCond2;
      //var x = random(-r*3, r*3 - tWidth);
      var d = floor(sqrt(pow(r, 2) - pow(x, 2))); // x^2 + y^2 < r^2
    } while (!circleCond || (others.length > 0 && isOverlapping(x, y, data[i], others)));

    words[i] = new Word(x, y, data[i]);
    wws.push(new WW(x, y, data[i]));
    words[i].size = map(words[i].size, 0, 100, 8, 40);
    others.push(words[i]);
  }
}

function isOverlapping(x, y, word, others) {
  var wordHeight = (word.size / max_size) * 40 + 10; // scale word size from old data
  textSize(wordHeight);
  var wWidth = textWidth(word.text);

  for (var i = 0; i < others.length; i++) {
    textSize(others[i].size);
    var oWidth = textWidth(others[i].text);

    if (x + wWidth > others[i].x &&
      x < others[i].x + oWidth &&
      y + others[i].size * 0.2 > others[i].y - others[i].size * 0.7 &&
      y - wordHeight < others[i].y) {
      return true;
    }
  }
  return false;
}



function Word(x, y, data) {
  this.x = x;
  this.y = y;
  this.orglsize = data.size;
  this.size = (data.size / max_size) * 40 + 10;
  this.text = data.text;
  // this.color = {r:139, g:124, b:214};
  if (data.cat == "1") {
    this.color = {
      r: 139,
      g: 124,
      b: 214
    }; //purple
  } else if (data.cat == "2") {
    this.color = {
      r: 247,
      g: 181,
      b: 66
    }; //yellow
  } else if (data.cat == "3") {
    this.color = {
      r: 232,
      g: 114,
      b: 145
    } // salmon
  } else {
    this.color = {
      r: 137,
      g: 202,
      b: 143
    };
  }
}

class WW {
  constructor(x, y, data) {
    this.x = x+conWidth / 2;
    this.y = y+conHeight / 2;
    this.orglsize = data.size;
    if (data.cat == 0) {
      this.size = 0;
    } else {
      this.size = (data.size / max_size) * 40 + 5;
    }
    this.text = data.text;
    this.click = false;
    // this.color = {r:139, g:124, b:214};
    if (data.cat == "1") {
      print("hi");
      this.color = {
        r: 139,
        g: 124,
        b: 214
      }; //purple
    } else if (data.cat == "2") {
      this.color = {
        r: 247,
        g: 181,
        b: 66
      }; //yellow
    } else if (data.cat == "3") {
      this.color = {
        r: 232,
        g: 114,
        b: 145
      } // salmon
    } else {
      this.color = {
        r: 137,
        g: 202,
        b: 143
      };
    }
  }
  render() {
    noStroke();
    textSize(map(this.size, 0, 100, 8, 40));
    fill(this.color.r, this.color.g, this.color.b);
    text(this.text, this.x, this.y);
   
    if (mouseX > this.x && mouseX < this.x + textWidth(this.text) && mouseY > this.y - this.size*.5 && mouseY < this.y + this.size*.5) { 
      fill(255, 255, 255);
      // noStroke(); //invisible rectangle
      // rect(this.x, this.y + this.size*0.2+1, textWidth(this.text), -this.size*1.7);
      text(this.text, this.x, this.y);
      if(mouseIsPressed && this.click == false){
        this.click = true;
        console.log(this.text);
        winarr.push( win );
      }
    }

  }
}
class WW4 {
  constructor(x, y, data) {
    
    this.x = x + conWidth4/2;
    this.y = y + conHeight4/2;
    
    this.orglsize = data.size;
    if (data.cat == 0) {
      this.size = 0;
    } else {
      this.size = (data.size / max_size) * 40 + 5;
    }
    this.text = data.text;
    this.click = false;
    // this.color = {r:139, g:124, b:214};
    if (data.cat == "1") {
      print("hi");
      this.color = {
        r: 139,
        g: 124,
        b: 214
      }; //purple
    } else if (data.cat == "2") {
      this.color = {
        r: 247,
        g: 181,
        b: 66
      }; //yellow
    } else if (data.cat == "3") {
      this.color = {
        r: 232,
        g: 114,
        b: 145
      } // salmon
    } else {
      this.color = {
        r: 137,
        g: 202,
        b: 143
      };
    }
  }
  render() {
    noStroke();
    textSize(map(this.size, 0, 100, 8, 40));
    fill(this.color.r, this.color.g, this.color.b);
    text(this.text, this.x, this.y);

    if (mouseX > this.x && mouseX < this.x + textWidth(this.text) && mouseY > this.y - this.size * .5 && mouseY < this.y + this.size * .5) {
      fill(255, 255, 255);
      // noStroke(); //invisible rectangle
      // rect(this.x, this.y + this.size*0.2+1, textWidth(this.text), -this.size*1.7);
      text(this.text, this.x, this.y);
      if (mouseIsPressed && this.click == false) {
        this.click = true;
        console.log(this.text);
        // window.open("http://www.google.com")
        winarr.push( win );

      }
    }

  }
}

function mouseReleased() {
  for (var i = 0; i < wws.length; i++) {
    wws[i].click = false;
  }
  for (var i = 0; i < wws4.length; i++) {
    wws4[i].click = false;
  }
}
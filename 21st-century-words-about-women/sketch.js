var wws = [];
var wws4 = [];
var wws3 = [];
var wws2 = [];
var wws1 = [];

var words = [];
var others = [];
var others4 = [];
var others3 = [];
var others2 = [];
var others1 = [];



var data;
var count;
var url2001 = 'data/data2000.json';
var max_size = 0;
var slider, sliderLabel;
var r;
var w = 400;

var conWidth; // = 1570; //full wordCloud's position
var conHeight;
var conWidth4; //0.64*windowWidth cat 4 position
var conHeight4; //0,53*windowHeight
var conWidth3; //= 2500; //cat 3 position
var conHeight3; //= 450;
var conWidth2; //= 340; //cat 2 position
var conHeight2; //= 1400;
var conWidth1; //= 2200; //cat 1 position
var conHeight1; // = 1400;



var buttonshow;


var hider4 = [20, 20, 3000, 3000, 100];
// fill(255);
//   rect(0,0,windowWidth*2, windowHeight*2);
var recarr = [hider4];
var recarr2 = [];

var win;
var winarr = [];


let fontMediumSerif;
let fontMediumMono;

function preload() {
  data = loadJSON(url2001);
  fontMediumSerif = loadFont('font/IBMPlexSerif-Medium.ttf');
  fontMediumMono = loadFont('font/IBMPlexMono-Medium.ttf');
}

function setup() {

  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(30, 50);

  win = [0, 0, windowWidth - 50, windowHeight];
  console.log(windowWidth, windowHeight);

  conWidth = windowWidth;
  conHeight = 0.85 * windowHeight;
  conWidth4 = 0.64 * windowWidth;
  conHeight4 = 0.53 * windowHeight;
  conWidth3 = 1.2 * windowWidth;
  conHeight3 = 0.53 * windowHeight;
  conWidth2 = 0.64 * windowWidth;
  conHeight2 = 1.2 * windowHeight;
  conWidth1 = 1.2 * windowWidth;
  conHeight1 = 1.2 * windowHeight;

  drawNav();


  count = Object.keys(data).length;
  for (var i = 0; i < count; i++) {
    if (data[i].size > max_size) {
      max_size = data[i].size;
    }
  }
  var minW = 134 * pow(2.72, count * 0.005); // y = 134*e^(0.004*x)

  //   r = 130;
  //   drawCloudDetail4();
  //   drawCloudDetail3();
  //   drawCloudDetail2();
  //   drawCloudDetail1();



  r = 417;
  drawCloud();
}

let title;
let slur;
let body;
let identity;
let rights;

function drawNav() {



  buttonshow = createElement('hl', 'sort by \r\n categories'); //Line One\r\nLine Two
  buttonshow.style("font-family", "fontMediumMono");
  buttonshow.style("text-align", "left");
  buttonshow.position(75, 470);
  buttonshow.mouseClicked(showDetail);
  buttonshow.style("width", "150px");
  buttonshow.style("height", "60px");
  buttonshow.mouseOver(hlbutton);
  buttonshow.mouseOut(rvbutton);

  buttonshow.style("color", "#ffffff");
  buttonshow.style('font-size', '14px');
  buttonshow.style('text-decoration', 'underline');

  function hlbutton() {
    buttonshow.style("color", "rgb(153, 143, 255)");


  }

  function rvbutton() {
    buttonshow.style("color", "rgb(255, 255, 255)");
  }


  title = createButton('21st Century:<br>Words about Women');
  title.style("text-align", "left");
  title.position(70, 110);
  title.style("font-family", "fontMediumMono");
  title.style("background-color", "rgba(0,0,0,0)");
  title.style("color", "#ffffff");
  title.style("border", "none");
  title.style('font-size', '20px');

  textFont(fontMediumMono);


  var start = (windowHeight - 60) / 2 - 20;
  var unit = 25;
  var margin = 75;

  fill(255);
  noStroke();
  textSize(16);
  text("Categories:", 45, start - 65); //////////////

  textSize(18);

  noFill();
  stroke(255, 255, 255);
  // rect(1, start - 100, 140, 175);
  // rect(windowWidth - 200, start - 100, 140, 175);

  //     if (data.cat == "1") {
  //   this.color = {
  //     r: 109,
  //     g: 189,
  //     b: 242
  //   }; //right
  // } else if (data.cat == "2") {
  //   this.color = {
  //     r: 242,
  //     g: 211,
  //     b: 109
  //   }; //slur
  // } else if (data.cat == "3") {
  //   this.color = {
  //     r: 229,
  //     g: 125,
  //     b: 109
  //   } // body
  // } else {
  //   this.color = {
  //     r: 103,
  //     g: 221,
  //     b: 229
  //   }; //id

  slurs = createElement("h1", "slurs");
  slurs.style("font-family", "fontRegularMono");
  slurs.style("color", "rgb(242, 211, 109)");
  slurs.position(margin, start);
  slurs.style('font-size', '16px');
  slurs.mouseOver(hlslur);
  slurs.mouseOut(rvslur);

  function hlslur() {
    slurs.style("color", "rgb(255, 255, 255)");
  }

  function rvslur() {
    slurs.style("color", "rgb(253, 186, 114)");
  }

  body = createElement("h1", "body");
  body.style("font-family", "fontRegularMono");
  body.style("color", "rgb(229, 125, 109)");
  body.position(margin, start + unit);
  body.style('font-size', '16px');
  body.mouseOver(hlbody);
  body.mouseOut(rvbody);

  function hlbody() {
    body.style("color", "rgb(255, 255, 255)");
  }

  function rvbody() {
    body.style("color", "rgb(250, 154, 148)");
  }

  identity = createElement("h1", "identity");
  identity.style("font-family", "fontRegularMono");
  identity.style("color", "rgb(147, 217, 213)");
  identity.position(margin, start + unit * 2);
  identity.style('font-size', '16px');
  identity.mouseOver(hlidentity);
  identity.mouseOut(rvidentity);

  function hlidentity() {
    identity.style("color", "rgb(255, 255, 255)");
  }

  function rvidentity() {
    identity.style("color", "rgb(147, 217, 203)");
  }

  rights = createElement("h1", "rights");
  rights.style("font-family", "fontRegularMono");
  rights.style("color", "rgb(109, 189, 242)");
  rights.position(margin, start + unit * 3);
  rights.style('font-size', '16px');
  rights.mouseOver(hlrights);
  rights.mouseOut(rvrights);

  function hlrights() {
    rights.style("color", "rgb(255, 255, 255)");
  }

  function rvrights() {
    rights.style("color", "rgb(118, 154, 242)");
  }

  var l2000;
  var l2001;
  var l2002;
  var l2003;
  var l2004;
  var l2005;
  var l2006;
  var l2007;
  var l2008;
  var l2009;
  var l2010;
  var l2011;
  var l2012;
  var l2013;
  var l2014;
  var l2015;
  var l2016;
  var l2017;
  var l2018;
  var l2019;
  var l2020;
  var tls = 100;
  var step = 63;
  var offw = 65;


  var event = createElement("h1", "United States v. Morrison");
  event.style("font-family", "fontExtraLightMono");
  event.style("color", "rgb(255, 255, 255)");
  event.position(20, windowHeight - offw - 42);
  event.style("text-decoration", "underline")
  event.style('font-size', '11px');
  event.mouseOver(hl2000);
  event.mouseOut(rv2000);


  var ln = createElement("h1", "|");
  ln.style("font-family", "fontExtraLightMono");
  ln.style("color", "rgb(255, 255, 255)");
  ln.position(93, windowHeight - offw - 23);
  ln.style('font-size', '12px');
  ln.mouseOver(hl2000);
  ln.mouseOut(rv2000);

  //    border-left: 1px solid green;
  //   height: 500px;
  //   position: 0;
  //   left: 50%;
  //   margin-left: 70px;
  //   top: 0;

  l2000 = createElement("h1", "2000");
  l2000.style("font-family", "fontRegularMono");
  l2000.style("color", "rgb(255, 255, 255)");
  l2000.position(72, windowHeight - offw - 13);
  l2000.style('font-size', '20px');
  l2000.mouseOver(hl2000);
  l2000.mouseOut(rv2000);
  l2000.mouseClicked(op2000);

  function hl2000() {
    l2000.style("color", "rgb(153, 143, 255)");
    event.style("color", "rgb(153, 143, 255)");
    ln.style("color", "rgb(153, 143, 255)");

  }

  function rv2000() {
    l2000.style("color", "rgb(255, 255, 255)");
    event.style("color", "rgb(255, 255, 255)");
    ln.style("color", "rgb(255, 255, 255)");

  }

  function op2000() {
    window.open('https://editor.p5js.org/yurand/present/kG1Hmv_zE', '_self'); ////////////////needs to change the link
  }



  l2001 = createElement("h1", "2001");
  l2001.style("font-family", "fontRegularMono");
  l2001.style("color", "rgb(255, 255, 255)");
  l2001.position(tls + 1 * step, windowHeight - offw);
  l2001.style('font-size', '12px');
  l2001.mouseOver(hl2001);
  l2001.mouseOut(rv2001);
  l2001.mouseClicked(op2001);

  function hl2001() {
    l2001.style("color", "rgb(153, 143, 255)");
  }

  function rv2001() {
    l2001.style("color", "rgb(255, 255, 255)");
  }
  /////////////////////////
  function op2001() {
    window.open('https://editor.p5js.org/yurand/present/nmHAAu4uL', '_self');
  }


  l2002 = createElement("h1", "2002");
  l2002.style("font-family", "fontRegularMono");
  l2002.style("color", "rgb(255, 255, 255)");
  l2002.position(tls + 2 * step, windowHeight - offw);
  l2002.style('font-size', '12px');
  l2002.mouseOver(hl2002);
  l2002.mouseOut(rv2002);
  l2002.mouseClicked(op2002);

  function hl2002() {
    l2002.style("color", "rgb(153, 143, 255)");
  }

  function rv2002() {
    l2002.style("color", "rgb(255, 255, 255)");
  }
  /////////////////////////
  function op2002() {
    window.open('https://editor.p5js.org/yurand/present/y_ybZOtVF', '_self');
  }



  l2003 = createElement("h1", "2003");
  l2003.style("font-family", "fontRegularMono");
  l2003.style("color", "rgb(255, 255, 255)");
  l2003.position(tls + 3 * step, windowHeight - offw);
  l2003.style('font-size', '12px');
  l2003.mouseOver(hl2003);
  l2003.mouseOut(rv2003);
  l2003.mouseClicked(op2003);

  function hl2003() {
    l2003.style("color", "rgb(153, 143, 255)");
  }

  function rv2003() {
    l2003.style("color", "rgb(255, 255, 255)");
  }
  /////////////////////////
  function op2003() {
    window.open('https://editor.p5js.org/yurand/present/qY-tTZklv', '_self');
  }


  l2004 = createElement("h1", "2004");
  l2004.style("font-family", "fontRegularMono");
  l2004.style("color", "rgb(255, 255, 255)");
  l2004.position(tls + 4 * step, windowHeight - offw);
  l2004.style('font-size', '12px');
  l2004.mouseOver(hl2004);
  l2004.mouseOut(rv2004);
  l2004.mouseClicked(op2004);

  function hl2004() {
    l2004.style("color", "rgb(153, 143, 255)");
  }

  function rv2004() {
    l2004.style("color", "rgb(255, 255, 255)");
  }

  function op2004() {
    window.open('https://editor.p5js.org/yurand/present/ZemfeX2Jj', '_self');
  }


  l2005 = createElement("h1", "2005");
  l2005.style("font-family", "fontRegularMono");
  l2005.style("color", "rgb(255, 255, 255)");
  l2005.position(tls + 5 * step, windowHeight - offw);
  l2005.style('font-size', '12px');
  l2005.mouseOver(hl2005);
  l2005.mouseOut(rv2005);
  l2005.mouseClicked(op2005);

  function hl2005() {
    l2005.style("color", "rgb(153, 143, 255)");
  }

  function rv2005() {
    l2005.style("color", "rgb(255, 255, 255)");
  }

  function op2005() {
    window.open('https://editor.p5js.org/yurand/present/dOhE-wtfG', '_self');
  }



  l2006 = createElement("h1", "2006");
  l2006.style("font-family", "fontRegularMono");
  l2006.style("color", "rgb(255, 255, 255)");
  l2006.position(tls + 6 * step, windowHeight - offw);
  l2006.style('font-size', '12px');
  l2006.mouseOver(hl2006);
  l2006.mouseOut(rv2006);
  l2006.mouseClicked(op2006);

  function hl2006() {
    l2006.style("color", "rgb(153, 143, 255)");
  }

  function rv2006() {
    l2006.style("color", "rgb(255, 255, 255)");
  }

  function op2006() {
    window.open('https://editor.p5js.org/yurand/present/m_NTU1lZ1', '_self');
  }


  l2007 = createElement("h1", "2007");
  l2007.style("font-family", "fontRegularMono");
  l2007.style("color", "rgb(255, 255, 255)");
  l2007.position(tls + 7 * step, windowHeight - offw);
  l2007.style('font-size', '12px');
  l2007.mouseOver(hl2007);
  l2007.mouseOut(rv2007);
  l2007.mouseClicked(op2007);

  function hl2007() {
    l2007.style("color", "rgb(153, 143, 255)");
  }

  function rv2007() {
    l2007.style("color", "rgb(255, 255, 255)");
  }

  function op2007() {
    window.open('https://editor.p5js.org/yurand/present/2PxO9PxkT', '_self');
  }


  l2008 = createElement("h1", "2008");
  l2008.style("font-family", "fontRegularMono");
  l2008.style("color", "rgb(255, 255, 255)");
  l2008.position(tls + 8 * step, windowHeight - offw);
  l2008.style('font-size', '12px');
  l2008.mouseOver(hl2008);
  l2008.mouseOut(rv2008);
  l2008.mouseClicked(op2008);

  function hl2008() {
    l2008.style("color", "rgb(153, 143, 255)");
  }

  function rv2008() {
    l2008.style("color", "rgb(255, 255, 255)");
  }

  function op2008() {
    window.open('https://editor.p5js.org/yurand/present/e7sLCOsEd', '_self');
  }


  l2009 = createElement("h1", "2009");
  l2009.style("font-family", "fontRegularMono");
  l2009.style("color", "rgb(255, 255, 255)");
  l2009.position(tls + 9 * step, windowHeight - offw);
  l2009.style('font-size', '12px');
  l2009.mouseOver(hl2009);
  l2009.mouseOut(rv2009);
  l2009.mouseClicked(op2009);

  function hl2009() {
    l2009.style("color", "rgb(153, 143, 255)");
  }

  function rv2009() {
    l2009.style("color", "rgb(255, 255, 255)");
  }

  function op2009() {
    window.open('https://editor.p5js.org/yurand/present/UpVTJUAxn', '_self');
  }

  l2010 = createElement("h1", "2010");
  l2010.style("font-family", "fontRegularMono");
  l2010.style("color", "rgb(255, 255, 255)");
  l2010.position(tls + 10 * step, windowHeight - offw);
  l2010.style('font-size', '12px');
  l2010.mouseOver(hl2010);
  l2010.mouseOut(rv2010);
  l2010.mouseClicked(op2010);

  function hl2010() {
    l2010.style("color", "rgb(153, 143, 255)");
  }

  function rv2010() {
    l2010.style("color", "rgb(255, 255, 255)");
  }

  function op2010() {
    window.open('https://editor.p5js.org/yurand/present/nWAWXsi-8', '_self');
  }


  l2011 = createElement("h1", "2011");
  l2011.style("font-family", "fontRegularMono");
  l2011.style("color", "rgb(255, 255, 255)");
  l2011.position(tls + 11 * step, windowHeight - offw);
  l2011.style('font-size', '12px');
  l2011.mouseOver(hl2011);
  l2011.mouseOut(rv2011);
  l2011.mouseClicked(op2011);

  function hl2011() {
    l2011.style("color", "rgb(153, 143, 255)");
  }

  function rv2011() {
    l2011.style("color", "rgb(255, 255, 255)");
  }

  function op2011() {
    window.open('https://editor.p5js.org/yurand/present/Dh7YP4T1d', '_self');
  }


  l2012 = createElement("h1", "2012");
  l2012.style("font-family", "fontRegularMono");
  l2012.style("color", "rgb(255, 255, 255)");
  l2012.position(tls + 12 * step, windowHeight - offw);
  l2012.style('font-size', '12px');
  l2012.mouseOver(hl2012);
  l2012.mouseOut(rv2012);
  l2012.mouseClicked(op2012);

  function hl2012() {
    l2012.style("color", "rgb(153, 143, 255)");
  }

  function rv2012() {
    l2012.style("color", "rgb(255, 255, 255)");
  }

  function op2012() {
    window.open('https://editor.p5js.org/yurand/present/loH8qANKv', '_self');
  }


  l2013 = createElement("h1", "2013");
  l2013.style("font-family", "fontRegularMono");
  l2013.style("color", "rgb(255, 255, 255)");
  l2013.position(tls + 13 * step, windowHeight - offw);
  l2013.style('font-size', '12px');
  l2013.mouseOver(hl2013);
  l2013.mouseOut(rv2013);
  l2013.mouseClicked(op2013);

  function hl2013() {
    l2013.style("color", "rgb(153, 143, 255)");
  }

  function rv2013() {
    l2013.style("color", "rgb(255, 255, 255)");
  }

  function op2013() {
    window.open('https://editor.p5js.org/yurand/present/84gmVvKZU', '_self');
  }


  l2014 = createElement("h1", "2014");
  l2014.style("font-family", "fontRegularMono");
  l2014.style("color", "rgb(255, 255, 255)");
  l2014.position(tls + 14 * step, windowHeight - offw);
  l2014.style('font-size', '12px');
  l2014.mouseOver(hl2014);
  l2014.mouseOut(rv2014);
  l2014.mouseClicked(op2014);

  function hl2014() {
    l2014.style("color", "rgb(153, 143, 255)");
  }

  function rv2014() {
    l2014.style("color", "rgb(255, 255, 255)");
  }

  function op2014() {
    window.open('https://editor.p5js.org/yurand/present/EMKihwS3K', '_self');
  }


  l2015 = createElement("h1", "2015");
  l2015.style("font-family", "fontRegularMono");
  l2015.style("color", "rgb(255, 255, 255)");
  l2015.position(tls + 15 * step, windowHeight - offw);
  l2015.style('font-size', '12px');
  l2015.mouseOver(hl2015);
  l2015.mouseOut(rv2015);
  l2015.mouseClicked(op2015);

  function hl2015() {
    l2015.style("color", "rgb(153, 143, 255)");
  }

  function rv2015() {
    l2015.style("color", "rgb(255, 255, 255)");
  }

  function op2015() {
    window.open('https://editor.p5js.org/yurand/present/hsYV2nZN1', '_self');
  }


  l2016 = createElement("h1", "2016");
  l2016.style("font-family", "fontRegularMono");
  l2016.style("color", "rgb(255, 255, 255)");
  l2016.position(tls + 16 * step, windowHeight - offw);
  l2016.style('font-size', '12px');
  l2016.mouseOver(hl2016);
  l2016.mouseOut(rv2016);
  l2016.mouseClicked(op2016);

  function hl2016() {
    l2016.style("color", "rgb(153, 143, 255)");
  }

  function rv2016() {
    l2016.style("color", "rgb(255, 255, 255)");
  }

  function op2016() {
    window.open('https://editor.p5js.org/yurand/present/fiQfVn0Pr', '_self');
  }


  l2017 = createElement("h1", "2017");
  l2017.style("font-family", "fontRegularMono");
  l2017.style("color", "rgb(255, 255, 255)");
  l2017.position(tls + 17 * step, windowHeight - offw);
  l2017.style('font-size', '12px');
  l2017.mouseOver(hl2017);
  l2017.mouseOut(rv2017);
  l2017.mouseClicked(op2017);

  function hl2017() {
    l2017.style("color", "rgb(153, 143, 255)");
  }

  function rv2017() {
    l2017.style("color", "rgb(255, 255, 255)");
  }

  function op2017() {
    window.open('https://editor.p5js.org/yurand/present/Jns96X5iT', '_self');
  }


  l2018 = createElement("h1", "2018");
  l2018.style("font-family", "fontRegularMono");
  l2018.style("color", "rgb(255, 255, 255)");
  l2018.position(tls + 18 * step, windowHeight - offw);
  l2018.style('font-size', '12px');
  l2018.mouseOver(hl2018);
  l2018.mouseOut(rv2018);
  l2018.mouseClicked(op2018);

  function hl2018() {
    l2018.style("color", "rgb(153, 143, 255)");
  }

  function rv2018() {
    l2018.style("color", "rgb(255, 255, 255)");
  }

  function op2018() {
    window.open('https://editor.p5js.org/yurand/present/DAgcMfj70', '_self');
  }


  l2019 = createElement("h1", "2019");
  l2019.style("font-family", "fontRegularMono");
  l2019.style("color", "rgb(255, 255, 255)");
  l2019.position(tls + 19 * step, windowHeight - offw);
  l2019.style('font-size', '12px');
  l2019.mouseOver(hl2019);
  l2019.mouseOut(rv2019);
  l2019.mouseClicked(op2019);

  function hl2019() {
    l2019.style("color", "rgb(153, 143, 255)");
  }

  function rv2019() {
    l2019.style("color", "rgb(255, 255, 255)");
  }

  function op2019() {
    window.open('https://editor.p5js.org/yurand/present/PEsEIkrJI', '_self');
  }


  l2020 = createElement("h1", "2020");
  l2020.style("font-family", "fontRegularMono");
  l2020.style("color", "rgb(255, 255, 255)");
  l2020.position(tls + 20 * step, windowHeight - offw);
  l2020.style('font-size', '12px');
  l2020.mouseOver(hl2020);
  l2020.mouseOut(rv2020);
  l2020.mouseClicked(op2020);

  function hl2020() {
    l2020.style("color", "rgb(153, 143, 255)");
  }

  function rv2020() {
    l2020.style("color", "rgb(255, 255, 255)");
  }

  function op2020() {
    window.open('https://editor.p5js.org/yurand/present/HIsqQYaFb', '_self');
  }



}


function showDetail() {
  window.open("https://editor.p5js.org/yurand/present/KLj_lmnx3", "_self")

}

function hideDetail() {
  recarr.push([20, 20, 3000, 3000, 100]);
}

function closeWindow() {
  winarr = [];
}

function draw() {


  for (var i = 0; i < wws.length; i++) { //main wordcloud
    wws[i].render();
  }



}




///////////////////////draw main



function drawCloud() {
  // console.log("cloud");
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
    } while (!circleCond || (others.length > 0 && isOverlapping(x, y, data[i], others))) {

      words[i] = new Word(x, y, data[i]);
      wws.push(new WW(x, y, data[i]));
      words[i].size = map(words[i].size, 0, 100, 8, 40);
      others.push(words[i]);
    }
  }
}


class WW {
  constructor(x, y, data) {
    this.x = x + conWidth / 2;
    this.y = y + conHeight / 2;
    this.orglsize = data.size;
    if (data.cat == 0) {
      this.size = 0;
    } else {
      this.size = (data.size / max_size) * 40 + 5;
    }
    this.text = data.text;
    this.click = false;
    if (data.cat == "1") {
      this.color = {
        r: 109,
        g: 189,
        b: 242
      }; //right
    } else if (data.cat == "2") {
      this.color = {
        r: 242,
        g: 211,
        b: 109
      }; //slur
    } else if (data.cat == "3") {
      this.color = {
        r: 229,
        g: 125,
        b: 109
      } // body
    } else {
      this.color = {
        r: 147,
        g: 217,
        b: 213
      }; //id
    }
  }
  render() {
    noStroke();
    textSize(map(this.size, 0, 100, 8, 60));
    textFont(fontMediumSerif);

    fill(this.color.r, this.color.g, this.color.b);
    text(this.text, this.x, this.y);

    if (mouseX > this.x && mouseX < this.x + textWidth(this.text) && mouseY > this.y - this.size * .5 && mouseY < this.y + this.size * .5) {
      fill(255, 255, 255);
      // noStroke(); //invisible rectangle
      // rect(this.x, this.y + this.size*0.2+1, textWidth(this.text), -this.size*1.7);
      text(this.text, this.x, this.y);
      if (mouseIsPressed && this.click == false && this.text == "woman") {
        this.click = true;
        console.log(this.text);
        // winarr = [win];
        window.open("https://www.figma.com/proto/DicZ9nBz2dXHRdyLvFPY9Q/CD-project-2?node-id=71%3A3&scaling=min-zoom")

      }
    }

  }
}


////////////////////draw 4




function drawCloudDetail4() {

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
        var y = random(-0.6 * d + size, 0.6 * d);
        var circleCond1 = (pow(x + tWidth, 2) + pow(y - size, 2)) < pow(r, 2);
        var circleCond2 = (pow(x + tWidth, 2) + pow(y, 2)) < pow(r, 2);
        var circleCond = circleCond1 && circleCond2;
        //var x = random(-r*3, r*3 - tWidth);
        var d = floor(sqrt(pow(r, 2) - pow(x, 2))); // x^2 + y^2 < r^2
      } while (!circleCond || (others4.length > 0 && isOverlapping(x, y, data[i], others4))) {

        words[i] = new Word(x, y, data[i]);
        wws4.push(new WW4(x, y, data[i]));
        words[i].size = map(words[i].size, 0, 100, 8, 40);
        others4.push(words[i]);
      }
    }
  }
}


class WW4 {
  constructor(x, y, data) {

    this.x = x + conWidth4 / 2;
    this.y = y + conHeight4 / 2;

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
      this.color = {
        r: 109,
        g: 189,
        b: 242
      }; //right
    } else if (data.cat == "2") {
      this.color = {
        r: 242,
        g: 211,
        b: 109
      }; //slur
    } else if (data.cat == "3") {
      this.color = {
        r: 229,
        g: 125,
        b: 109
      } // body
    } else {
      this.color = {
        r: 147,
        g: 217,
        b: 213
      }; //id
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
        window.open("http://www.google.com")
        // winarr = [win];
      }
    }

  }
}




///////////////////////draw3






function drawCloudDetail3() {

  for (var i = 0; i < count; i++) {
    if (data[i].cat == "3") {

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
      } while (!circleCond || (others3.length > 0 && isOverlapping(x, y, data[i], others3))) {

        words[i] = new Word(x, y, data[i]);
        wws3.push(new WW3(x, y, data[i]));
        words[i].size = map(words[i].size, 0, 100, 8, 40);
        others3.push(words[i]);
      }
    }
  }
}


class WW3 {
  constructor(x, y, data) {

    this.x = x + conWidth3 / 2;
    this.y = y + conHeight3 / 2;

    this.orglsize = data.size;
    if (data.cat == "1") {
      this.color = {
        r: 109,
        g: 189,
        b: 242
      }; //right
    } else if (data.cat == "2") {
      this.color = {
        r: 242,
        g: 211,
        b: 109
      }; //slur
    } else if (data.cat == "3") {
      this.color = {
        r: 229,
        g: 125,
        b: 109
      } // body
    } else {
      this.color = {
        r: 147,
        g: 217,
        b: 213
      }; //id
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
        window.open("http://www.google.com")
        // winarr = [win];
      }
    }

  }
}



////////////////draw 2




function drawCloudDetail2() {

  for (var i = 0; i < count; i++) {
    if (data[i].cat == "2") {

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
      } while (!circleCond || (others2.length > 0 && isOverlapping(x, y, data[i], others2))) {

        words[i] = new Word(x, y, data[i]);
        wws2.push(new WW2(x, y, data[i]));
        words[i].size = map(words[i].size, 0, 100, 8, 40);
        others2.push(words[i]);
      }
    }
  }
}




class WW2 {
  constructor(x, y, data) {

    this.x = x + conWidth2 / 2;
    this.y = y + conHeight2 / 2;

    this.orglsize = data.size;
    if (data.cat == "1") {
      this.color = {
        r: 109,
        g: 189,
        b: 242
      }; //right
    } else if (data.cat == "2") {
      this.color = {
        r: 242,
        g: 211,
        b: 109
      }; //slur
    } else if (data.cat == "3") {
      this.color = {
        r: 229,
        g: 125,
        b: 109
      } // body
    } else {
      this.color = {
        r: 147,
        g: 217,
        b: 213
      }; //id
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
        window.open("http://www.google.com")
        // winarr = [win];
      }
    }

  }
}



//////////////////draw 1



function drawCloudDetail1() {

  for (var i = 0; i < count; i++) {
    if (data[i].cat == "1") {

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
      } while (!circleCond || (others1.length > 0 && isOverlapping(x, y, data[i], others1))) {

        words[i] = new Word(x, y, data[i]);
        wws1.push(new WW1(x, y, data[i]));
        words[i].size = map(words[i].size, 0, 100, 8, 40);
        others1.push(words[i]);
      }
    }
  }
}


class WW1 {
  constructor(x, y, data) {

    this.x = x + conWidth1 / 2;
    this.y = y + conHeight1 / 2;

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
      this.color = {
        r: 109,
        g: 189,
        b: 242
      }; //right
    } else if (data.cat == "2") {
      this.color = {
        r: 242,
        g: 211,
        b: 109
      }; //slur
    } else if (data.cat == "3") {
      this.color = {
        r: 229,
        g: 125,
        b: 109
      } // body
    } else {
      this.color = {
        r: 147,
        g: 217,
        b: 213
      }; //id
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
        window.open("http://www.google.com")
        // winarr = [win];
      }
    }

  }
}

//////////////////



function mouseReleased() {
  for (var i = 0; i < wws.length; i++) {
    wws[i].click = false;
  }
  for (var i = 0; i < wws4.length; i++) {
    wws4[i].click = false;
  }
  for (var i = 0; i < wws3.length; i++) {
    wws3[i].click = false;
  }
  for (var i = 0; i < wws2.length; i++) {
    wws2[i].click = false;
  }
  for (var i = 0; i < wws1.length; i++) {
    wws1[i].click = false;
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
      r: 109,
      g: 189,
      b: 242
    }; //purple
  } else if (data.cat == "2") {
    this.color = {
      r: 242,
      g: 211,
      b: 109
    }; //yellow
  } else if (data.cat == "3") {
    this.color = {
      r: 242,
      g: 125,
      b: 109
    } // salmon
  } else {
    this.color = {
      r: 103,
      g: 221,
      b: 229
    };
  }
}

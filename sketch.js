
let yoff = 0.0;
let xinit = 0;
let cloudx = 100;
let cloudy = 100;
let xBoat = 0;
let xBoat2 = 0;
let drop = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(var i = 0; i < 1500; i++) {
    drop[i] = new Drop();
}
  xOff = 50
  xBoat2 = width + 400;
  //noLoop();
}

function draw() {
  
  let sky = color(103, 196, 240);
  background(sky); 
  for(var i = 0; i < 1500; i++) {
    drop[i].show();
    drop[i].update();
  }

  strokeWeight(0);
  makeCloud(cloudx, cloudy);
  makeCloud(cloudx + 100, cloudy+100);  
  cloudx += 0.5;

  strokeWeight(15);
  push();
translate(0, 200);
//xinit +=1;

if(xinit == width){
  xinit = 0;
}
  strokeWeight(5);
  stroke(0)
  fill(100, 50, 20);
//triangle(0, 400, 300, 200, 600, 400);
triangle(300, 400, 570, 250, 900, 400);
push()
translate(450, 330); 
  branch(40);
pop()
drawMountain();
fill(0);

push();
translate(0,1400);
drawMountain();
pop();

point(250,300);
push()
translate(250, 300); 
  branch(50);
pop()

ocean();
drawBoat(xBoat,270);
xBoat+=3;
if (xBoat > width) {
  xBoat = -200;
}
translate(0,100);
ocean();
translate(0,100);
ocean();

drawBoat(xBoat2 ,265);
xBoat2-=4;
if (xBoat2 < -400) {
  xBoat2 = width + 400;
}
translate(0,100);
ocean();
pop();


}


function branch(len) {
  angleMode(DEGREES);
  push();
  if (len >10) {
    strokeWeight(map(len, 10,100, 1, 15));
    stroke(70,40,20);
    line(0, 0, 0, -len);
    translate(0, -len);
    /*
    rotate(random(-20, -30));
    branch(len * random(0.7, 0.9));    
    rotate(random(50, 50));
    branch(len * random(0.7, 0.9));
    */
    
    rotate(-30);
    branch(len * 0.8);    
    rotate(50);
    branch(len * 0.8);
  } else {
  
    let r = 80 + random(-20, 20);
    let g = 120 + random(-20, 20);
    let b = 40 + random(-20, 20);

    r = 80 + map(len, 0,100, -20,20);
    g = 120 + map(len, 0,100, -20,20);
    b = 40 + map(len, 0,100, -20,20);

    fill(r, g, b);
    noStroke();
    ellipse(0,0, 10);
   /* 
    beginShape();
    for(let i = 45; i < 135; i++) {
      let rad = 15;
      let x = rad * cos(i);
      let y = rad * sin(i);
      vertex(x, y);
    }

    for(let i = 135; i > 40; i--) {
      let rad = 15;
      let x = rad * cos(i);
      let y = rad * sin(i) + 20 ;
      vertex(x, y);
    }

   
   
    endShape(); */
  }
  pop(); 

}

function drawMountain() {
  fill(100, 50, 20);
  beginShape();

  curveVertex(600,400)  
  curveVertex(600,400)

  
  
  curveVertex(300,200)
  curveVertex(200,200)
  //curveVertex(100,200)

  curveVertex(0,400)
  curveVertex(0,400)
  

  endShape();
}

function ocean() {
  //waves
  fill(67, 157, 171);
  noStroke();

  beginShape();

  let xoff = 0; 
  for (let x = 0; x <= width; x += 10) {
    let y = map(noise(xoff, yoff), 0, 1, 400, 350);

    vertex(x, y);
    xoff += 0.05;
  }

  // increment y dimension for noise
  yoff += 0.01;
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}

function makeCloud(cloudx, cloudy) {
 // this.speed = 500;
  fill(250);
  ellipse(cloudx, cloudy, 70, 50);
  ellipse(cloudx - 10, cloudy + 10, 70, 50);  
  ellipse(cloudx - 20, cloudy + 10, 70, 50);
}

function sand() {
  fill(250, 180, 100, 95);
  noStroke();
  square(0, 550, 800, 5, 5);
}

function Drop() {
  this.x = random(0, width/2);
  this.y = random(0, -height);
  
  this.show = function() {
    noStroke();
    fill(255);
    ellipse(this.x, this.y, random(1, 5), random(1, 10));   
  }
  this.update = function() {
    this.speed = random(5, 10);
    this.gravity = 1.05;
    this.y = this.y + this.speed*this.gravity;  
    
    if (this.y > height) {
      this.y = random(0, -height);
      this.gravity = 0;
}
}
}

function drawBoat(x, y) {

  fill('brown')
  beginShape()
  vertex(145 + x, y + 190)
  vertex(155 + x, y + 210)
  vertex(260 + x, y + 210)
  vertex(270 + x, y + 190)
  vertex(145 + x, y + 190)
  endShape()

  //sail1
  fill('yellow')
  stroke('yellow')
  beginShape()
  vertex(206 + x, y + 190)
  vertex(206 + x, y + 115)
  vertex(167 + x, y + 185)
  vertex(206 + x, y + 185)
  endShape()
  fill('teal')
  stroke('teal')


  //sail2
  beginShape()
  vertex(210 + x, y + 123)
  vertex(210 + x, y + 185)
  vertex(240 + x, y + 185)
  vertex(210 + x, y + 123)
  endShape()
  if (x > width) {
    x = 0
  } else {
    x = x + 1
  }
}
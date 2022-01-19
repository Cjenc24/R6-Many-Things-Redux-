//definitions
let circles = [];
let num_circles = 20;
let c1, c2;
let d = 20;
let gamePoints=0; 
let timer =15;

//instructions
let help = {
  text: [
    "click as many bubbles as you can before the timer reaches 0",
    "your score will follow your mouse",
    "press ^ to hide/show instructions*",
  ],
  size: 15,
  visible: true,
};
function drawHelpText() {
  if (help.visible) {
    textSize(help.size);
    let i = 15;
    for (let line of help.text) {
      text(line, 10, i);
      i += 15;
    }
  }
}
function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < num_circles; i++) {

    var x = random(d, windowWidth - d);
    var y = random(d, windowHeight - d);
//array - object/constructor
    circles[i] = new Circle(x, y, d);
  }

}
// POINT/CIRCLE (this is from https://www.jeffreythompson.org/collision-detection/point-circle.php, but I made sure to understand it)
function pointCircle(px, py, cx, cy, r) {
  //point of mousex = px, point of mouseY = py
  //cx & cy are circle
  // get distance between the point and circle's center
  // using the Pythagorean Theorem
  distX = px - cx;
  distY = py - cy;
  distance = sqrt(distX * distX + distY * distY);
  // if the distance is less than the circle's radius the point is inside
  if (distance <= r) {
    return true;
  }
  return false;
}

function draw() {
  background(120);
  let c1 = color(206, 164, 230);
  let c2 = color(164, 230, 229);
  fill(lerpColor(c1, c2, map(mouseX, mouseY, width, 0, 1)));

  for (let i = 0; i < num_circles; i++) {
    result = pointCircle(
      mouseX,
      mouseY,
      circles[i].x,
      circles[i].y,
      //the pointCircle goes off of radius so that's why diameter is div by 2
      circles[i].diameter / 2 
    );
    //if the result is true AND the mouse it clicked::
    if ((result)&&(mouseIsPressed)) {
      gamePoints +=1;
      circles[i].move()
    }
    circles[i].update();
    circles[i].checkbounds();
    circles[i].draw();
  }
fill('black');
  drawHelpText();
  textSize(32);
  push();
   translate (mouseX,mouseY); 
  text(gamePoints,windowWidth/7,windowHeight/7);
  pop();
let m = minute();
text('minutes of the hour: ' + m, width-350, windowHeight-20);
// I used https://editor.p5js.org/marynotari/sketches/S1T2ZTMp- to help put together the timer
text(timer, 10, height/2);
if (frameCount % 60 == 0 && timer > 0) { // 60 is 1 second-- it will stop at 0
    timer --;
  }
  loop(); 

  if (timer === 0) {
    textSize(50);
 text("time's up!", width/4, height/2);
 text("score:"+ gamePoints, width/4, height/3);
 textSize(30);
 text("press = to restart", width/4, height/1.5);
  num_circles = 0;
 
    }

  }



  

class Circle {
  constructor(x, y, d) {
    this.x = x;
    this.y = y;
    this.diameter = d;
  }

  draw() {
    circle(this.x, this.y, this.diameter);
  }
  
  move(){
    this.x = random(d, windowWidth - d);
    this.y = random(d, windowHeight - d);
  }
  
  update(){
    this.x = this.x + random(-5,5);
      this.y = this.y + random(-2,2);
  }
  //moves circle back on screen if it goes off
  checkbounds(){
    if((this.x<0)||(this.x>windowWidth)||(this.y<0)||(this.y>windowHeight)){
      this.move();
    }}
 
  }
function keyPressed() {
if( key === '^') {
    help.visible = !help.visible;
  }
if(key === '='){
gamePoints = 0;
timer = 15; 
num_circles = 20;
draw();
}
  }







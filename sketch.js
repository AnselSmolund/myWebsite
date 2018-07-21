var paths = [];
var painting = false;
var next = 0;
var current;
var previous;
function setup() {
  var canvas = createCanvas(windowWidth,500);
  canvas.parent('sketch-holder');
  current = createVector(0,0);
  previous = createVector(0,0);
  begin();
}

function draw() {
  background(28,186,173); //1CBCAD 00011100 10111100 10101101 1 + 4 + 7 + 32 + 128
  if (millis() > next && painting) {
    var minX = previous.x - 50;
    var minY = previous.y - 50;
    var maxX = previous.x + 50;
    var maxY = previous.y + 50;
    cx = (random(1) * (maxX - minX + 1)) + minX;
    cy = (random(1) * (maxY - minY + 1)) + minY;

    if(mouseIsPressed &&
      (mouseX < width && mouseX > 0) &&
      (mouseY < height && mouseY > 0)){
        current.x = mouseX;
        current.y = mouseY;
        disableSelect(document.getElementById('myName'));
      }
    else{
      current.x = constrain(cx, 0, width);
      current.y = constrain(cy, 0, height);
    }
    var force = p5.Vector.sub(current, previous);
    force.mult(0.05);
    paths[paths.length - 1].add(current, force);
    next = millis() + random(100);
    previous.x = current.x;
    previous.y = current.y;
  }

  // Draw all paths
  for( var i = 0; i < paths.length; i++) {
    paths[i].update();
    paths[i].display();
  }
}

// Start it up
function begin() {
  next = 0;
  painting = true;
  previous.x = width/2;
  previous.y = height/2;
  paths.push(new Path());
}
function Path() {
  this.particles = [];
  this.hue = random(100);
  this.add = function(position,force){
    this.particles.push(new Particle(position,force,this.hue));
  }
  this.update = function(){
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
    }
  }
  this.display = function(){
    for (var i = this.particles.length - 1; i >= 0; i--) {
      if (this.particles[i].lifespan <= 0) {
        this.particles.splice(i, 1);
      } else {
        this.particles[i].display(this.particles[i+1]);
      }
    }
  }
}

function Particle(position, force, hue) {
  this.position = createVector(position.x, position.y);
  this.velocity = createVector(force.x, force.y);
  this.drag = 0.95;
  this.lifespan = 255;

  this.update = function(){
    this.position.add(this.velocity);
    this.velocity.mult(this.drag);
    this.lifespan--;
  }
  this.display = function(other){
    stroke(0, this.lifespan);
    fill(0, this.lifespan/2);
    ellipse(this.position.x,this.position.y, 8, 8);
    if (other) {
      line(this.position.x, this.position.y, other.position.x, other.position.y);
    }
  }
}

function windowResized(){
  resizeCanvas(windowWidth,500);
}

function disableSelect(el){
    if(el.addEventListener){
        el.addEventListener("mousedown",disabler,"false");
    } else {
        el.attachEvent("onselectstart",disabler);
    }
}
function disabler(e){
    if(e.preventDefault){ e.preventDefault(); }
    return false;
}

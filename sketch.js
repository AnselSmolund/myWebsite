var paths = [];
// Are we painting?
var painting = false;
// How long until the next circle
var next = 0;
// Where are we now and where were we?
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

    // Grab mouse position
    var minX = previous.x - 50;
    var minY = previous.y - 50;
    var maxX = previous.x + 50;
    var maxY = previous.y + 50;

    cx = (random(1) * (maxX - minX + 1)) + minX;
    cy = (random(1) * (maxY - minY + 1)) + minY;
    current.x = constrain(cx, 0, width);
    current.y = constrain(cy, 0, height);

    // New particle's force is based on mouse movement
    var force = p5.Vector.sub(current, previous);
    force.mult(0.05);

    // Add new particle
    paths[paths.length - 1].add(current, force);

    // Schedule next circle
    next = millis() + random(100);

    // Store mouse values
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

// Stop
// function mouseReleased() {
//   painting = false;
// }

// A Path is a list of particles
function Path() {
  this.particles = [];
  this.hue = random(100);
}

Path.prototype.add = function(position, force) {
  // Add a new particle with a position, force, and hue
  this.particles.push(new Particle(position, force, this.hue));
}

// Display plath
Path.prototype.update = function() {
  for (var i = 0; i < this.particles.length; i++) {
    this.particles[i].update();
  }
}

// Display plath
Path.prototype.display = function() {

  // Loop through backwards
  for (var i = this.particles.length - 1; i >= 0; i--) {
    // If we shold remove it
    if (this.particles[i].lifespan <= 0) {
      this.particles.splice(i, 1);
    // Otherwise, display it
    } else {
      this.particles[i].display(this.particles[i+1]);
    }
  }

}

// Particles along the path
function Particle(position, force, hue) {
  this.position = createVector(position.x, position.y);
  this.velocity = createVector(force.x, force.y);
  this.drag = 0.95;
  this.lifespan = 255;
}

Particle.prototype.update = function() {
  // Move it
  this.position.add(this.velocity);
  // Slow it down
  this.velocity.mult(this.drag);
  // Fade it out
  this.lifespan--;
}

// Draw particle and connect it with a line
// Draw a line to another
Particle.prototype.display = function(other) {
  stroke(0, this.lifespan);
  fill(0, this.lifespan/2);
  ellipse(this.position.x,this.position.y, 8, 8);
  // If we need to draw a line
  if (other) {
    line(this.position.x, this.position.y, other.position.x, other.position.y);
  }
}
function windowResized(){
  resizeCanvas(windowWidth,500);
}

var snake;
var food;
var input;
var count = 51;
var tail = [];
var scl = 20;
function setup(){
  createCanvas(600,500);
  snake = new Snake();
  input = select('#speed');
  frameRate(25);
  fill(255);
  strokeWeight(6);
  beginShape();
  vertex(0, 0);
  vertex(600, 0);
  vertex(600, 500);
  vertex(0, 500);
  endShape(CLOSE);
  pickLocation();
  background(0,0,0,100);
}
function pickLocation(){
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  food = createVector(floor(random(cols)),floor(random(rows)));
  food.mult(scl);
}


function draw(){



  count = constrain(count,51,255);
  if(document.getElementById("pause").checked){
    document.getElementById('pauseDisplay').innerHTML = "";
    snake.update();
  }
  if(!document.getElementById("pause").checked){
    document.getElementById('pauseDisplay').innerHTML = "paused";
  }
  if(snake.x == 580 || snake.x == 0){
    count-=0.5;
  }

  snake.death();
  snake.show();
  fill(255,255,0);
  if(document.getElementById("pause").checked){
    rect(food.x,food.y,scl,scl);
  }
  if(document.getElementById("red").checked){
    document.getElementById("redDisplay").style.backgroundColor = "red";
  }else{
    document.getElementById("redDisplay").style.backgroundColor = "white";
  }
  if(document.getElementById("green").checked){
    document.getElementById("greenDisplay").style.backgroundColor = "green";
  }else{
    document.getElementById("greenDisplay").style.backgroundColor = "white";
  }
  if(document.getElementById("blue").checked){
    document.getElementById("blueDisplay").style.backgroundColor = "blue";
  }else{
    document.getElementById("blueDisplay").style.backgroundColor = "white";
  }
  if(!document.getElementById("pause").checked){
    if(document.getElementById("green").checked && !document.getElementById("red").checked && !document.getElementById("blue").checked){
      fill(0,count,0);
    }
    else if(document.getElementById("green").checked && document.getElementById("red").checked&& !document.getElementById("blue").checked){
      fill(count,count,0);
    }
    else if(document.getElementById("green").checked && document.getElementById("red").checked && document.getElementById("blue").checked){
      fill(count,count,count);
    }
    else if(document.getElementById("green").checked && !document.getElementById("red").checked&& document.getElementById("blue").checked){
      fill(0,count,count);
    }
    else if(!document.getElementById("green").checked && document.getElementById("red").checked&& !document.getElementById("blue").checked){
      fill(count,0,0);
    }
    else if(!document.getElementById("green").checked && document.getElementById("red").checked && document.getElementById("blue").checked){
      fill(count,0,count);
    }
    else if(!document.getElementById("green").checked && !document.getElementById("red").checked&& document.getElementById("blue").checked){
      fill(0,0,count);
    }
    else{
      fill(0,0,0);
    }
    rect(food.x,food.y,scl,scl);
  }


  if(snake.eat(food)){
    pickLocation();
  }

}
function keyTyped(){
  if(key === 'r'){
    if(document.getElementById('red').checked){
      document.getElementById('red').checked = false;
    }
    else{
      document.getElementById('red').checked = true;
    }
  }
  if(key === 'g'){
    if(document.getElementById('green').checked){
      document.getElementById('green').checked = false;
    }
    else{
      document.getElementById('green').checked = true;
    }
  }
  if(keyCode === 32){
    if(document.getElementById("pause").checked)
    {
      document.getElementById("pause").checked = false;
    }
    else{
      document.getElementById("pause").checked = true;
    }
  }
  if(key === 'b'){
    if(document.getElementById('blue').checked){
      document.getElementById('blue').checked = false;
    }
    else{
      document.getElementById('blue').checked = true;
    }
  }
}

function keyPressed(){
  if(keyCode === UP_ARROW){
    if(tail.length > 0){
      if(tail[tail.length-1].x != snake.x)
      {
        snake.dir(0,-1);
      }
    }
    else{
      snake.dir(0,-1);
    }
  }
  else if(keyCode === DOWN_ARROW){
    if(tail.length > 0){
      if(tail[tail.length-1].x != snake.x)
      {
          snake.dir(0,1);
      }
    }
    else{
        snake.dir(0,1);
    }
  }
  else if(keyCode === LEFT_ARROW){
    if(tail.length > 0){
      if(tail[tail.length-1].y != snake.y)
      {
          snake.dir(-1,0);
      }
    }
    else{
        snake.dir(-1,0);
    }

  }
  else if(keyCode === RIGHT_ARROW){
    if(tail.length > 0){
      if(tail[tail.length-1].y != snake.y)
      {
          snake.dir(1,0);
      }
    }
    else{
        snake.dir(1,0);
    }

  }
}
function Snake(){
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;


  this.eat = function(pos){
    var d = dist(this.x,this.y,pos.x,pos.y)
    if(d<1){
      this.total++;
      count+=10;
      var v = createVector(this.x,this.y);
      tail.push(v);
      return true;
    }
    else{
      return false;
    }
  }
  this.dir = function(x,y){

    this.xspeed = x;
    this.yspeed = y;
  }
  this.death = function(){
    for(var i = 0; i < tail.length; i++){
      var pos = tail[i];
      var d = dist(this.x,this.y,pos.x,pos.y);
      if(d < 1){
        count-=10;
        console.log(count);
        this.total = 0;
        tail = [];
      }
    }
  }
  this.update = function(){
    if(this.total == tail.length){
    for(var i = 0; i < this.total-1; i++){
      tail[i] = tail[i+1];
    }
  }
    tail[this.total - 1] = createVector(this.x,this.y);
    this.x += this.xspeed* scl;
    this.y += this.yspeed * scl;

    this.x = constrain(this.x,0,width-scl);
    this.y = constrain(this.y,0,height-scl);
  }
  this.show = function(){
  document.getElementById("rgb").innerHTML = count;

  if(document.getElementById("green").checked && !document.getElementById("red").checked && !document.getElementById("blue").checked){
    document.getElementById("rgb").innerHTML = "rgb( 0, " + count + ",0)";
    document.getElementById("rgb").style.color = "rgb( 0, " + count + ",0)";
    fill(0,count,0);
  }
  else if(document.getElementById("green").checked && document.getElementById("red").checked&& !document.getElementById("blue").checked){
    document.getElementById("rgb").innerHTML = "rgb( " + count + ", " + count + ",0)";
    document.getElementById("rgb").style.color = "rgb( " + count + ", " + count + ",0)";
    fill(count,count,0);
  }
  else if(document.getElementById("green").checked && document.getElementById("red").checked && document.getElementById("blue").checked){
    document.getElementById("rgb").innerHTML = "rgb( " + count + ", " + count +", " + count+ ")";
    document.getElementById("rgb").style.color = "rgb( " + count + ", " + count +", " + count+ ")";
    fill(count,count,count);
  }
  else if(document.getElementById("green").checked && !document.getElementById("red").checked&& document.getElementById("blue").checked){
    document.getElementById("rgb").innerHTML = "rgb( 0, " + count +", " + count+ ")";
    document.getElementById("rgb").style.color = "rgb( 0, " + count +", " + count+ ")";
    fill(0,count,count);
  }
  else if(!document.getElementById("green").checked && document.getElementById("red").checked&& !document.getElementById("blue").checked){
    document.getElementById("rgb").innerHTML = "rgb( " + count + ", 0, 0)";
    document.getElementById("rgb").style.color = "rgb( " + count + ", 0, 0)";
    fill(count,0,0);
  }
  else if(!document.getElementById("green").checked && document.getElementById("red").checked && document.getElementById("blue").checked){
    document.getElementById("rgb").innerHTML = "rgb( " + count + ", 0, " + count+ ")";
    document.getElementById("rgb").style.color = "rgb( " + count + ", 0, " + count+ ")";
    fill(count,0,count);
  }
  else if(!document.getElementById("green").checked && !document.getElementById("red").checked&& document.getElementById("blue").checked){
    document.getElementById("rgb").innerHTML = "rgb( 0, 0, " + count+ ")";
    document.getElementById("rgb").style.color = "rgb( 0, 0, " + count+ ")";
    fill(0,0,count);
  }
  else{
    document.getElementById("rgb").innerHTML = "rgb( 0, 0, 0)";
    document.getElementById("rgb").style.color = "rgb( 0, 0, 0)";

    fill(0,0,0);
  }
  noStroke();
    for(var i = 0; i < this.total; i++){
      rect(tail[i].x,tail[i].y,scl,scl);
    }

    rect(this.x,this.y,scl,scl);

  }
}
function touchMoved() {
	line(touchX, touchY, ptouchX, ptouchY);
	return false;
}

function Asteroid(position, size) {

  if(position) {
    this.position = position.copy();
  } else {
    this.position = createVector(random(width),random(height));
  }

  if(size) {
    this.r = size * 0.5;
  } else {
    this.r = random(25,35);
  }

  this.velocity = p5.Vector.random2D();
  this.surfacePoints = floor(random(5,15));
  this.offset = [];

  for(var i=0; i<this.surfacePoints; i++){
    this.offset[i] = random(-this.r*0.5, this.r*0.5);
  }

  this.update = function() {
    this.position.add(this.velocity);
  }

  this.render = function() {
    push();
    if (this.r < 35) {
      fill('#1d1d1d');
      stroke('#fff');
    } else {
      fill('#1d1d1d');
      strokeWeight(10);
      stroke('#62B1F6');
    }
    translate(this.position.x, this.position.y);

    beginShape();
    for(var i=0; i<this.surfacePoints; i++){
      var angle = map(i,0,this.surfacePoints,0,TWO_PI);
      var r = this.r + this.offset[i];
      var x = r * cos(angle);
      var y = r * sin(angle);
      vertex(x,y);
    }
    endShape(CLOSE);
    pop();
  }

  this.breakup = function() {
    var newAsteroids = [];
    if (this.r >35 && this.r <45) {
      eggPoints.push(new Egg(this.position));
      this.split(newAsteroids);
      return newAsteroids;
    } else {
      this.split(newAsteroids);
      return newAsteroids;
    }
  }

  this.expand = function() {
    return new Asteroid(this.position, this.r *3);
  }

  this.edges = function() {
    if(this.position.x > width + this.r){
      this.position.x = -this.r;
    } else if(this.position.x < -this.r){
      this.position.x = width + this.r;
    }

    if(this.position.y > height + this.r){
      this.position.y = -this.r;
    } else if(this.position.y < -this.r){
      this.position.y = height + this.r;
    }
  }

  this.split = function(newAsteroids) {
    newAsteroids[0] = new Asteroid(this.position, this.r);
    newAsteroids[1] = new Asteroid(this.position, this.r);
  }
}

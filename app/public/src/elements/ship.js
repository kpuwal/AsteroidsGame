function Ship() {
  this.position = createVector(width/10, height/2);
  this.r = 10;
  this.heading = 0;
  this.rotation = 0;
  this.velocity = createVector(0,0);
  this.isThrusting = false;

  this.thrusting = function(b) {
    this.isThrusting = b;
  }

  this.update = function() {
    if (this.isThrusting) {
      this.thrust();
    }

    this.position.add(this.velocity);
    this.velocity.mult(0.98);
  }

  this.render = function() {
    push();
      translate(this.position.x, this.position.y);
      rotate(this.heading + PI/2);
      fill('#fff');
      stroke('#fff');
      triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
      rect(1,6, 5,5);
      rect(-7,6, 5,5);
      noStroke();
      fill('#1d1d1d');
      ellipse(0,4,7,7);
      ellipse(0,-3,5,5);
    pop();
  }

  this.thrust = function() {
    var force = p5.Vector.fromAngle(this.heading);
    force.mult(0.1);
    this.velocity.add(force);
    push();
      fill('red');
      noStroke();
      translate(ship.position.x, ship.position.y);
      rotate(this.heading + PI);
      rect(14, 2, 12,1);
      rect(14, -3, 12,1);
      rect(14, 5, 12,1);
      rect(14, -6, 12,1);
      fill('yellow');
      rect(14, 3, 6,1);
      rect(14, -5, 6,1);
    pop();
  }

  this.hits = function(asteroid) {
    var distance = dist(this.position.x, this.position.y, asteroid.position.x, asteroid.position.y);
    if(distance < asteroid.r + this.r) {
      return true;
    } else {
      return false;
    }
  }

  this.captures = function(egg) {
    var distance = dist(this.position.x, this.position.y, egg.position.x, egg.position.y);
    if(int(distance) === egg.r + this.r) {
      return true;
    } else {
      return false;
    }
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

  this.setRotation = function(angle){
    this.rotation = angle;
  }

  this.turn = function() {
    this.heading += this.rotation;
  }

  this.dies = function() {
    deadShip = true;
  }
}

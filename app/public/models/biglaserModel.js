function BigLaser(shipPosition, angle) {
  this.position = createVector(shipPosition.x, shipPosition.y);
  this.velocity = p5.Vector.fromAngle(angle);
  this.velocity.mult(10);

  this.update = function() {
    this.position.add(this.velocity);
  }

  this.render = function() {
    push();
    translate(this.position.x, this.position.y);
    stroke('#fff');
    noFill();
    ellipse(0,0,10,10);
    stroke('red');
    ellipse(0,0,5,5);
    pop();
  }

  this.hits = function(asteroid) {
    var distance = dist(this.position.x, this.position.y, asteroid.position.x, asteroid.position.y);

    if(distance < asteroid.r) {
      return true;
    } else {
      return false;
    }
  }

  this.offscreen = function() {
    if (this.position.x > width || this.position.x < 0) {
      return true;
    }
    if (this.position.y > height || this.position.y < 0) {
      return true;
    }
    return false;
  }
}

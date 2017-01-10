function Egg(position){
  this.position = position.copy();
  this.r = 20;
  this.velocity = p5.Vector.random2D();
  this.acceleration = (0.01, 0.01);

  this.update = function() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
  }

  this.render = function() {
    push();
    fill('red');
    translate(this.position.x, this.position.y);
    ellipse(0, 0, this.r, this.r);
    pop();
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

function Egg(position){
  this.position = position.copy();
  this.r = 38;
  this.core = random(this.r/3, this.r/2);
  this.velocity = p5.Vector.random2D();
  // this.acceleration = (0.001, 0.001);

  this.update = function() {
    this.position.add(this.velocity);
    // this.velocity.add(this.acceleration);
  }

  this.render = function() {
    var core = random(this.r/6, this.r/2);
    push();
    translate(this.position.x, this.position.y);
    fill('red');
    ellipse(0, 0, this.r, this.r);
    fill('#fff');
    ellipse(0, 0, core, core);
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

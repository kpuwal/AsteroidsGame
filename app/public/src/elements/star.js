function Star() {
  this.position = createVector(random(width), random(height));
  this.r = random(2, 5);

  this.render = function() {
    noStroke();
    fill(255,255,255,random(10,90));
    ellipse(this.position.x, this.position.y, this.r, this.r);
  }
}

function Score(x,y) {
  this.x = x;
  this.y = y;
  this.r = 6;

  this.render = function() {
    push();
      translate(this.x, this.y);
      noFill();
      stroke('red');
      triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
      noStroke();
      fill('red');
      ellipse(0,3,4,4);
      ellipse(0,-1,2,2);
    pop();
  }
}

function Score(x,y) {
  this.x = x;
  this.y = y;
  this.r = 3;

  this.render = function() {
    push();
      // fill('red');
      // rect(this.x, this.y, 5, 5);
      translate(this.x, this.y);
      fill('red');
      stroke('red');
      triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
      // rect(0,5,3,3);
      // rect(-6,5,3,3);
      // noStroke();
      // fill('#1d1d1d');
      // ellipse(0,3,5,5);
      // ellipse(0,-2,2,2);
    pop();
  }
}

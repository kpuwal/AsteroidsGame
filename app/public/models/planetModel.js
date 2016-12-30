function Planet() {
  this.position = createVector(random(width), random(height));
  this.velocity = p5.Vector.random2D();
  this.r = 170;

  this.render = function() {
    this.jupiter();
    // this.saturn();
  }

  this.jupiter = function() {
    push();
      translate(this.position.x, this.position.y);
      stroke('#3d3d3d');
      strokeWeight(2);
      fill('#3d3d3d');
      ellipse(0,0, this.r, this.r);
      stroke('#1d1d1d');
      strokeWeight(1);
      ellipse(-25, 15, 30, 15);
      ellipse(-30, 15, 10, 5);
      noFill();
      arc(-30, 15, 60, 20, PI, TWO_PI + QUARTER_PI);
      arc(0, 0, 170, 10, PI, TWO_PI);
      arc(0, -50, 140, 10, PI, TWO_PI);
      arc(0, -30, 160, 10, PI, TWO_PI);
      arc(0, -20, 165, 10, PI, TWO_PI);
      arc(0, 40, 160, 10, PI, TWO_PI);
      arc(0, 50, 150, 10, PI, TWO_PI);
      arc(0, 55, 160, 10, PI, TWO_PI);
    pop();
  }

  this.saturn = function() {
    push();
      stroke('#000');
      strokeWeight(2);
      fill('#1d1d1d');
      ellipse(this.position.x, this.position.y, this.r, this.r);
    pop();
  }

  this.update = function() {
    this.position.add(this.velocity);
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
}

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
      stroke('#0d0d0d');
      strokeWeight(2);
      fill('#0d0d0d');
      ellipse(0,0, this.r, this.r);
      stroke('#1d1d1d');
      strokeWeight(1);
      ellipse(-25, 15, 30, 15);
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

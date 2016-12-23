var ship;
var asteroids = [];
var starfield = [];
var planets = [];
var lasers = [];

function setup() {
  createCanvas(windowWidth*0.99, windowHeight*0.99);
  ship = new Ship();

  for(var i=0; i<100; i++) {
    starfield.push(new Star());
  }

  for(var i=0; i<1; i++) {
    planets.push(new Planet());
  }

  for(var i=0; i<8; i++) {
    asteroids.push(new Asteroid());
  }
}

function keyReleased() {
  ship.setRotation(0);
  ship.thrusting(false);
}

function keyPressed() {
  if(key == ' '){
    lasers.push(new Laser(ship.position, ship.heading));
  } else if(keyCode == RIGHT_ARROW) {
    ship.setRotation(0.1);
  } else if(keyCode == LEFT_ARROW) {
    ship.setRotation(-0.1);
  } else if(keyCode == UP_ARROW) {
    ship.thrusting(true);
  }
}

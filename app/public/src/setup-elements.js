function setupElements() {
  for(var i=0; i<300; i++) {
    starfield.push(new Star());
  }
  
  jupiter = new Jupiter();
  ship = new Ship();

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
  } else if(keyCode == DOWN_ARROW) {
    biglasers.push(new BigLaser(ship.position, ship.heading));
  } else if(keyCode == RIGHT_ARROW) {
    ship.setRotation(0.1);
  } else if(keyCode == LEFT_ARROW) {
    ship.setRotation(-0.1);
  } else if(keyCode == UP_ARROW) {
    ship.thrusting(true);
  }
}

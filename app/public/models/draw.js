function draw() {
  background('#1d1d1d');
  text("sensor value: " + inData, 30, 30);

  for(var i=0;i<starfield.length; i++) {
    starfield[i].render();
  }

  for(var i=0; i<planets.length; i++) {
    planets[i].jupiter();
    planets[i].update();
    planets[i].edges();
  }

  for (var i=0; i<asteroids.length; i++) {
    if (ship.hits(asteroids[i])) {
      console.log('ooops!');
    }
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }

  if (eggPoints.length != 0) {
    for(var i=0; i<eggPoints.length; i++){
      eggPoints[i].render();
      eggPoints[i].update();
      if (eggPoints[i].offscreen()) {
        eggPoints.splice(i, 1);
      }
    }
  }

  for (var i=lasers.length - 1; i>=0; i--) {
    lasers[i].render();
    lasers[i].update();
    if (lasers[i].offscreen()) {
      lasers.splice(i, 1);
    } else {
      for (var j=asteroids.length -1; j>=0; j--) {
        if (lasers[i].hits(asteroids[j])) {
          if (asteroids[j].r > 10) {
            var newAsteroids = asteroids[j].breakup();
            asteroids = asteroids.concat(newAsteroids);
          }
          asteroids.splice(j, 1);
          lasers.splice(i, 1);
          break;
        }
      }
    }
  }

  for (var i=biglasers.length -1; i>=0; i--) {
    biglasers[i].render();
    biglasers[i].update();
    if (biglasers[i].offscreen()) {
      biglasers.splice(i, 1);
    } else {
      for (var j=asteroids.length -1; j>=0; j--) {
        if (biglasers[i].hits(asteroids[j])) {
          if (asteroids[j].r < 100) {
            var newAsteroids = asteroids[j].expand();
            asteroids = asteroids.concat(newAsteroids);
          }
          asteroids.splice(j, 1);
          biglasers.splice(i, 1);
          break;
        }
      }
    }
  }

  if(inData > 70) {
    biglasers.push(new BigLaser(ship.position, ship.heading));
  }

  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
  fill(255,255,255,90);
  text("ships: 3" , 30, height - 30);
}

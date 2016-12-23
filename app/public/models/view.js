function draw() {
  background('#1d1d1d');

  for(var i=0;i<starfield.length; i++) {
    starfield[i].render();
  }

  for(var i=0; i<planets.length; i++) {
    planets[i].jupiter();
    // planets[i].saturn();
    planets[i].update();
    planets[i].edges();
  }

  for (var i=0; i<asteroids.length; i++) {
    // if (ship.hits(asteroids[i])) {
    //   console.log('ooops!');
    // }
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }

  for (var i = lasers.length - 1; i >= 0; i--) {
    lasers[i].render();
    lasers[i].update();
    if (lasers[i].offscreen()) {
      lasers.splice(i, 1);
    } else {
      for (var j = asteroids.length - 1; j >= 0; j--) {
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
    console.log(lasers);
  }

  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
}

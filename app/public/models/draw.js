function draw() {
  background('#1d1d1d');
  fill(255,255,255,90);

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
        ship.dies();
        if (lifePoints.length >= 1) {
          deadShip = false;
          ship = new Ship();
          lifePoints.pop();
        } else {
          push();
            fill('red');
            textAlign(CENTER);
            text("G A M E   O V E R", width/2, height/2);
          pop();
          break
        }
      }
      asteroids[i].render();
      asteroids[i].update();
      asteroids[i].edges();
    }

    if (eggs.length != 0) {
      for(var i=0; i<eggs.length; i++){
        eggs[i].render();
        eggs[i].update();
        if (eggs[i].offscreen()) {
          eggs.splice(i, 1);
        } else {
          for (var i=0; i<eggs.length; i++){
            if (ship.captures(eggs[i])) {
              eggs.splice(i,1);
              lifePoints.push(1);
            }
          }
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
            asteroidPoints += 10;
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

    if (!deadShip) {
      ship.render();
      ship.update();
    } else {
      ship.render();
    }
    ship.turn();
    ship.edges();

    for (var i=0; i<lifePoints.length; i++) {
      score = new Score(65+ 10*i, height - 14);
      score.render();
    }

    push();
      fill('#fff');
      textSize(10);
      text("ships:  ", 30, height - 10);
      text("points:  " + asteroidPoints, width - 70, height -10);
    pop();
}

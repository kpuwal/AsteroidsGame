function drawShip() {
  if (!deadShip) {
    ship.render();
    ship.update();
  } else {
    ship.render();
  }
  ship.turn();
  ship.edges();
}

function drawStarfield() {
  for(var i=0;i<starfield.length; i++) {
    starfield[i].render();
  }
}

function drawJupiter() {
  jupiter.render();
  jupiter.update();
  jupiter.edges();
}

function drawAsteroids() {
  for (var i=0; i<asteroids.length; i++) {
    if (ship.hits(asteroids[i])) {
      ship.dies();
      if (lifePoints.length >= 1) {
        deadShip = false;
        ship = new Ship();
        lifePoints.pop();
        asteroids[i].breakup();
        break
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
}

function drawEggs() {
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
}

function drawBigLasers() {
  for (var i=biglasers.length -1; i>=0; i--) {
    biglasers[i].render();
    biglasers[i].update();
    if (biglasers[i].offscreen()) {
      biglasers.splice(i, 1);
    } else {
      for (var j=asteroids.length -1; j>=0; j--) {
        if (biglasers[i].hits(asteroids[j])) {
          if (asteroids[j].r < 80) {
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
}

function drawLasers() {
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
}

function drawTxtPanel() {
  for (var i=0; i<lifePoints.length; i++) {
    score = new Score(75 +16*i, height -14);
    score.render();
  }

  push();
    fill('#fff');
    textSize(12);
    text("ships:  ", 50, height -10);
    text("points:", width -70, height -10);
    fill('red');
    text(asteroidPoints, width -40, height -9);
  pop();

  fill(255,255,255,90);
  textSize(9);
  textAlign(CENTER);
  text("sensor values: " +inData1+ ", " +inData2+ ", " +inDataX+ ", " +inDataY+ ", " +inDataZ+ ", " , width/2, height -10);
}

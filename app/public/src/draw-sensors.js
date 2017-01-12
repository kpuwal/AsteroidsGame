function drawSensors() {
  if(inData1 < 70) {
    biglasers.push(new BigLaser(ship.position, ship.heading));
  }

  if(inData2 === 1) {
    lasers.push(new Laser(ship.position, ship.heading));
  }
}

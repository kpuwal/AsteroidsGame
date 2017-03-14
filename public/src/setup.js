var ship, jupiter, score;
var asteroids = [];
var starfield = [];
var lasers = [];
var biglasers = [];
var eggs = [];
var lifePoints = [1,1,1];
var asteroidPoints = 0;
var deadShip = false;

var inString, sensor, inData1, inData2, inDataX, inDataY, inDataZ;
var portName = '/dev/cu.Bluetooth-Incoming-Port';
// var portName = '/dev/cu.SLAB_USBtoUART';

var options = { baudrate: 115200 };

function setup() {
  createCanvas(windowWidth*0.99, windowHeight*0.99);

  serial = new p5.SerialPort();

  serial.on('connected', serverConnected);
  serial.on('open', portOpen);
  serial.on('data', serialEvent);
  serial.on('error', serialError);
  serial.on('close', portClose);
  serial.open(portName);

  ship = new Ship();

  for(var i=0; i<300; i++) {
    starfield.push(new Star());
  }

  jupiter = new Jupiter();

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

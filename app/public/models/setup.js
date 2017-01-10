var ships = [];
var asteroids = [];
var starfield = [];
var planets = [];
var lasers = [];
var biglasers = [];
var eggs = [];
var lifePoints = [];
var ship;

var inString, inData, sensor;
var portName = '/dev/cu.SLAB_USBtoUART';

var options = { baudrate: 9600 };

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
  // ships.push(ship);

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

function serverConnected() {
  console.log('connected to server');
}

function portOpen() {
  console.log('the serial port opened.')
}

function serialEvent() {
  // inData = serial.readLine(';');
  inString = serial.readStringUntil(';');
  sensor = split(inString, ',');
  inData = Number(sensor[0]);
  // console.log(sensor);
  console.log(sensor[0]);
  console.log(sensor[1]);


}

function serialError(err) {
  console.log('something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('the serial port closed.');
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

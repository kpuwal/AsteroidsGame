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
var portName = '/dev/cu.SLAB_USBtoUART';

var options = { baudrate: 9600 };

function setup() {
  createCanvas(windowWidth*0.99, windowHeight*0.99);

  setupElements();

  serial = new p5.SerialPort();

  serial.on('connected', serverConnected);
  serial.on('open', portOpen);
  serial.on('data', serialEvent);
  serial.on('error', serialError);
  serial.on('close', portClose);
  serial.open(portName);


}

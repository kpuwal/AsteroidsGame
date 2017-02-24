function serverConnected() {
  console.log('connected to server');
}

function portOpen() {
  console.log('the serial port opened.')
}

function serialEvent() {
  inString = serial.readStringUntil(';');
  sensor = split(inString, ',');
  inData1 = Number(sensor[0]);
  inData2 = Number(sensor[1]);
  
  inDataX = Number(sensor[2]);
  inDataY = Number(sensor[3]);
  inDataZ = Number(sensor[4]);
}

function serialError(err) {
  console.log('something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('the serial port closed.');
}

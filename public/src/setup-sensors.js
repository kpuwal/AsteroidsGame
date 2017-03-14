// import processing.serial.*;

// Serial  myPort;
// short   portIndex = 1;
// int     lf = 10;       //ASCII linefeed
// String  inString;      //String for testing serial communication
// int     calibrating;
//
// float   dt;
// float   x_gyr;  //Gyroscope data
// float   y_gyr;
// float   z_gyr;
// float   x_acc;  //Accelerometer data
// float   y_acc;
// float   z_acc;
// float   x_fil;  //Filtered data
// float   y_fil;
// float   z_fil;


function serverConnected() {
  console.log('connected to server');
}

function portOpen() {
  console.log('the serial port opened.')
}

function serialEvent() {
  var x_filtered;
  var y_filtered;
  var z_filtered;

  var inString = serial.readStringUntil('#');
  var dataString = split(inString, "#");

  // inString = serial.readStringUntil(';');
  // sensor = split(inString, ',');
  // inData1 = Number(sensor[0]);
  // inData2 = Number(sensor[1]);
  //
  // inDataX = Number(sensor[2]);
  // inDataY = Number(sensor[3]);
  // inDataZ = Number(sensor[4]);

  for (var i=0; i<dataString.length; i++) {
    dataString[i].substring(0, 4);
    var values = dataString[i].substring(4);
  }

  console.log(inString);

  // try {
  //   // Parse the data
  //   String[] dataStrings = split(inString, '#');
  //   for (int i = 0; i < dataStrings.length; i++) {
  //     String type = dataStrings[i].substring(0, 4);
  //     String dataval = dataStrings[i].substring(4);
  //   if (type.equals("DEL:")) {
  //       dt = float(dataval);
  //       /*
  //       print("Dt:");
  //       println(dt);
  //       */
  //
  //     } else if (type.equals("ACC:")) {
  //       String data[] = split(dataval, ',');
  //       x_acc = float(data[0]);
  //       y_acc = float(data[1]);
  //       z_acc = float(data[2]);
  //       /*
  //       print("Acc:");
  //       print(x_acc);
  //       print(",");
  //       print(y_acc);
  //       print(",");
  //       println(z_acc);
  //       */
  //     } else if (type.equals("GYR:")) {
  //       String data[] = split(dataval, ',');
  //       x_gyr = float(data[0]);
  //       y_gyr = float(data[1]);
  //       z_gyr = float(data[2]);
  //     } else if (type.equals("FIL:")) {
  //       String data[] = split(dataval, ',');
  //       x_fil = float(data[0]);
  //       y_fil = float(data[1]);
  //       z_fil = float(data[2]);
  //     }
  //   }
  // } catch (Exception e) {
  //     println("Caught Exception");
  // }

}

function serialError(err) {
  console.log('something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('the serial port closed.');
}

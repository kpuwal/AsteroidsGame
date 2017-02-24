#include <Wire.h>
#include <TimerOne.h>

#define    MPU9250_ADDRESS            0x68
#define    MAG_ADDRESS                0x0C

#define    GYRO_FULL_SCALE_250_DPS    0x00
#define    GYRO_FULL_SCALE_500_DPS    0x08
#define    GYRO_FULL_SCALE_1000_DPS   0x10
#define    GYRO_FULL_SCALE_2000_DPS   0x18

#define    ACC_FULL_SCALE_2_G        0x00
#define    ACC_FULL_SCALE_4_G        0x08
#define    ACC_FULL_SCALE_8_G        0x10
#define    ACC_FULL_SCALE_16_G       0x18


//int flexSensorPin0 = A0;
int flexSensorPin1 = A1;
int flexSensorPin2 = A2;
//int flexSensorPin3 = A3;
//int flexSensorPin6 = A6;
int mapped;


void I2Cread(uint8_t Address, uint8_t Register, uint8_t Nbytes, uint8_t* Data)
{
  Wire.beginTransmission(Address);
  Wire.write(Register);
  Wire.endTransmission();

  Wire.requestFrom(Address, Nbytes);
  uint8_t index=0;
  while (Wire.available())
    Data[index++]=Wire.read();
}


void I2CwriteByte(uint8_t Address, uint8_t Register, uint8_t Data)
{
  Wire.beginTransmission(Address);
  Wire.write(Register);
  Wire.write(Data);
  Wire.endTransmission();
}



long int ti;
volatile bool intFlag=false;

void setup()
{
  Wire.begin();
  Serial.begin(115200);

  I2CwriteByte(MPU9250_ADDRESS,29,0x06);
  I2CwriteByte(MPU9250_ADDRESS,26,0x06);


  I2CwriteByte(MPU9250_ADDRESS,27,GYRO_FULL_SCALE_1000_DPS);
  I2CwriteByte(MPU9250_ADDRESS,28,ACC_FULL_SCALE_4_G);
  I2CwriteByte(MPU9250_ADDRESS,0x37,0x02);

  I2CwriteByte(MAG_ADDRESS,0x0A,0x16);

  pinMode(13, OUTPUT);
  Timer1.initialize(10000);
  Timer1.attachInterrupt(callback);
  ti=millis();
}

long int cpt=0;

void callback()
{
  intFlag=true;
  digitalWrite(13, digitalRead(13) ^ 1);
}

void loop()
{
  while (!intFlag);
  intFlag=false;

  Serial.print (millis()-ti,DEC);
  Serial.print ("\t");

  uint8_t Buf[14];
  I2Cread(MPU9250_ADDRESS,0x3B,14,Buf);

  int16_t ax=-(Buf[0]<<8 | Buf[1]);
  int16_t ay=-(Buf[2]<<8 | Buf[3]);
  int16_t az=Buf[4]<<8 | Buf[5];

  int16_t gx=-(Buf[8]<<8 | Buf[9]);
  int16_t gy=-(Buf[10]<<8 | Buf[11]);
  int16_t gz=Buf[12]<<8 | Buf[13];


  Serial.print (ax,DEC);
  Serial.print ("\t");
  Serial.print (ay,DEC);
  Serial.print ("\t");
  Serial.print (az,DEC);
  Serial.print ("\t");

  Serial.print (gx,DEC);
  Serial.print ("\t");
  Serial.print (gy,DEC);
  Serial.print ("\t");
  Serial.print (gz,DEC);
  Serial.print ("\t");

  uint8_t ST1;
  do
  {
    I2Cread(MAG_ADDRESS,0x02,1,&ST1);
  }
  while (!(ST1&0x01));

  uint8_t Mag[7];
  I2Cread(MAG_ADDRESS,0x03,7,Mag);

  int16_t mx=-(Mag[3]<<8 | Mag[2]);
  int16_t my=-(Mag[1]<<8 | Mag[0]);
  int16_t mz=-(Mag[5]<<8 | Mag[4]);


  Serial.print (mx+200,DEC);
  Serial.print ("\t");
  Serial.print (my-70,DEC);
  Serial.print ("\t");
  Serial.print (mz-700,DEC);
  Serial.print ("\t");

  Serial.println("");

  // sensor A0
//  int flexSensorReading0 = analogRead(flexSensorPin0);
//  Serial.print(flexSensorReading0, DEC);
//  Serial.print(",");

  //sensor A1
  int flexSensorReading1 = analogRead(flexSensorPin1);
  mapped = map(flexSensorReading1, 500, 700, 0, 100);
  Serial.print(mapped, DEC);
  Serial.print(",");

  //sensor A2
  int flexSensorReading2 = analogRead(flexSensorPin2);
  mapped = map(flexSensorReading2, 500, 700, 0, 100);
  Serial.print(mapped, DEC);
  Serial.print(";");

  //sensor A3
//  int flexSensorReading3 = analogRead(flexSensorPin3);
//  Serial.print(flexSensorReading3, DEC);
//  Serial.print(",");

  //sensor A6
//  int flexSensorReading6 = analogRead(flexSensorPin6);
//  Serial.print(flexSensorReading6, DEC);
//  Serial.println(";");
  // delay(500);

  delay(100);
}

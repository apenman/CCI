

// These constants won't change.  They're used to give names
// to the pins used:
const int analogInPinX = A0;  
const int analogInPinY = A1;  
const int digitalInPin = 2;  

int JoystickValueX = 0;        // value read from the pot
int JoystickValueY = 0;        // value read from the pot
int JoystickButtonValue = 0;        // value read from the pot

int outputValue = 0;        // value output to the PWM (analog out)

void setup() {
  // initialize serial communications at 9600 bps:
  Serial.begin(9600);
  pinMode(digitalInPin, INPUT_PULLUP);  
}

void loop() {
  // read the input values
  JoystickValueX = analogRead(analogInPinX);
  JoystickValueY = analogRead(analogInPinY);
  JoystickButtonValue = digitalRead(digitalInPin);


  // print the results to the serial monitor:
  Serial.print(JoystickValueX);
  Serial.print(",");
  Serial.print(JoystickValueY);
  Serial.print(",");
  Serial.println(JoystickButtonValue);
  

  // wait 100 milliseconds before the next loop
  // for the analog-to-digital converter to settle
  // after the last reading:
  delay(5);
}

const {Board, Servo} = require("johnny-five");
const board = new Board();

board.on("ready", () => {
//   const servo = new Servo(10);

  // Servo alternate constructor with options
  var servo = new Servo({
    id: "MyServo",     // User defined id
    pin: 10,           // Which pin is it attached to?
    type: "standard",  // Default: "standard". Use "continuous" for continuous rotation servos
    range: [0, 130],    // Default: 0-180
    fps: 100,          // Used to calculate rate of movement between positions
    invert: false,     // Invert all specified positions
    startAt: 55,       // Immediately move to a degree
    center: false,      // overrides startAt if true and moves the servo to the center of the range
    pwmRange: [600, 2400]
  });

  // Add servo to REPL (optional)
  board.repl.inject({
    servo
  });


  // Servo API

  // min()
  //
  // set the servo to the minimum degrees
  // defaults to 0
  //
  // eg. servo.min();

  // max()
  //
  // set the servo to the maximum degrees
  // defaults to 180
  //
  // eg. servo.max();

  // center()
  //
  // centers the servo to 90°
  //
//   servo.center();

  // to( deg )
  //
  // Moves the servo to position by degrees
  //
//   servo.to( 0 );

  // step( deg )
  //
  // step all servos by deg
  //
  // eg. array.step( -20 );

//   servo.sweep();
});
const {Board, Servo} = require("johnny-five");
const board = new Board();
const controller = "PCA9685";

board.on("ready", () => {
  console.log("Connected");

  // Initialize the servo instance
  const a = new Servo({
    controller,
    pin: 0,
    range: [0, 165]
  });


  a.center()
  
});
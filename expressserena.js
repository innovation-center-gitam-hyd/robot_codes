var express = require('express');
var app = express();
var path = require('path');
var {Led, Board, Servo} = require('johnny-five');
var say = require('say')
var board = new Board();
app.use( express.static( __dirname + '/views' ));


var port = process.env.PORT || "8100";

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))



board.on('ready', () => {
    var led = new Led(13);
    var in1 = new Led(8)
    var in2 = new Led(9)
    var in3 = new Led(10)
    var in4 = new Led(11)
    var servoright = new Servo({
        id: "rightServo",     // User defined id
        pin: 5,           // Which pin is it attached to?
        type: "standard",  // Default: "standard". Use "continuous" for continuous rotation servos
        range: [0,180],    // Default: 0-180
        fps: 100,          // Used to calculate rate of movement between positions
        invert: false,     // Invert all specified positions
    });
    var servoleft = new Servo({
        id: "leftServo",     // User defined id
        pin: 6,           // Which pin is it attached to?
        type: "standard",  // Default: "standard". Use "continuous" for continuous rotation servos
        range: [0,180],    // Default: 0-180
        fps: 100,          // Used to calculate rate of movement between positions
        invert: false,     // Invert all specified positions
    });
    app.get("/", (req, res) => {
        res.status(200).sendFile(path.join(__dirname+'/views/index.html'))
    });
    
    app.post("/direction", (req, res) => {
        var direction = req.body.direction;
        console.log(direction)
        if(direction == 'forward'){
            led.blink(1000);
            in1.on();
            in2.off();
            in3.on();
            in4.off();
            res.status(200).json({
                direction: direction
            })
        }
        else if(direction == 'backward'){
            led.blink(2000);
            in1.off();
            in2.on();
            in3.off();
            in4.on();
            res.status(200).json({
                direction: direction
            })
        }
        else if(direction == 'stop'){
            led.blink(10000);
            in1.off();
            in2.off();
            in3.off();
            in4.off();
            res.status(200).json({
                direction: direction
            })
        }
        else if(direction == 'right'){
            led.blink(500);
            in1.on();
            in2.off();
            in3.off();
            in4.on();
            res.status(200).json({
                direction: direction
            })
        }
        else if(direction == 'left'){
            led.blink(5000);
            in1.off();
            in2.on();
            in3.on();
            in4.off();
            res.status(200).json({
                direction: direction
            })
        }
    });

    app.post("/speak", (req, res) => {
        var speech = req.body.speech;
        say.speak(speech);
        res.status(200).json({
            success: true
        })
    })

    app.post("/servo", (req, res) => {
        var direction = req.body.direction;
        var side = req.body.side;
        console.log(direction, side)
        if(side == 'left'){
            if(direction == 'up'){
                servoleft.min()
            }
            else if(direction == 'down'){

            }
        }
        else if(side == 'right'){
            if(direction == 'up'){
                servoright.to(20)
            }
            else if(direction == 'down'){
                servoright.to(65)
            }
        }
        else if(side == 'both'){
            if(direction == 'up'){

            }
            else if(direction == 'down'){

            }
        }
    });
    
    app.listen(port, () => {
        console.log(`Listening to requests on http://localhost:${port}`);
    });
})
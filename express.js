var express = require('express');
var app = express();
var path = require('path');
var five = require('johnny-five');
var board = new five.Board();
app.use( express.static( __dirname + '/views' ));


var port = process.env.PORT || "5001";

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

board.on('ready', () => {
    var led = five.Led(13);
    var in1 = new Led(7)
    var in2 = new Led(8)
    var in3 = new Led(9)
    var in4 = new Led(10)
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
    })
    
    app.listen(port, () => {
        console.log(`Listening to requests on http://localhost:${port}`);
    });
})
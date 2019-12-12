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
    app.get("/", (req, res) => {
        res.status(200).sendFile(path.join(__dirname+'/views/index.html'))
    });
    
    app.post("/direction", (req, res) => {
        var direction = req.body.direction;
        console.log(direction)
        if(direction == 'forward'){
            led.blink(1000);
            res.status(200).json({
                direction: direction
            })
        }
        else if(direction == 'backward'){
            led.blink(2000);
            res.status(200).json({
                direction: direction
            })
        }
        else if(direction == 'stop'){
            led.blink(10000);
            res.status(200).json({
                direction: direction
            })
        }
        else if(direction == 'right'){
            led.blink(500);
            res.status(200).json({
                direction: direction
            })
        }
        else if(direction == 'left'){
            led.blink(5000);
            res.status(200).json({
                direction: direction
            })
        }
    })
    
    app.listen(port, () => {
        console.log(`Listening to requests on http://localhost:${port}`);
    });
})
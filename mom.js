const { Board, Led, Proximity } = require("johnny-five");
var firebase = require('firebase/app');
require('firebase/database');
var app = firebase.initializeApp({
    apiKey: "AIzaSyB7gIcrRMuWnEFNMaLe4Gr_dMzP9GlKX8M",
    authDomain: "aiica-ymquty.firebaseapp.com",
    databaseURL: "https://aiica-ymquty.firebaseio.com",
    projectId: "aiica-ymquty",
    storageBucket: "aiica-ymquty.appspot.com",
    messagingSenderId: "690885056709",
    appId: "1:690885056709:web:91903c509a49a31ab838ac"
});
var board = new Board();
var database = app.database();

board.repl.inject({
    Led
})

board.on('ready', () => {
    var led = new Led(13);
    var in1 = new Led(8)
    var in2 = new Led(9)
    var in3 = new Led(10)
    var in4 = new Led(11)




    var robot_dir = database.ref('robots/mom');
    robot_dir.on('value', (snapshot) => {
        console.log(snapshot.val());
        var direction = snapshot.val().directions;
        if (direction == 'forward') {
            led.blink(1000);
            in1.on();
            in2.off();
            in3.on();
            in4.off();
        }
        else if (direction == 'backward') {
            led.blink(2000);
            in1.off();
            in2.on();
            in3.off();
            in4.on();
        }
        else if (direction == 'stop') {
            led.blink(10000);
            in1.off();
            in2.off();
            in3.off();
            in4.off();
        }
        else if (direction == 'right') {
            led.blink(500);
            in1.on();
            in2.off();
            in3.off();
            in4.on();
        }
        else if (direction == 'left') {
            led.blink(5000);
            in1.off();
            in2.on();
            in3.on();
            in4.off();
        }
    })

})



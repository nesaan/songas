const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });
const fs = require('fs')

let words = [];

fs.readFile('words.txt', 'utf-8', (err, data) => {

  words = data.split('\n');
  words = words.flatMap(element => {
    return element.split(' ');
  });
})

httpServer.listen(80);

app.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html");
  });


function trigger(word){
  let interval;
  let countdown = 2;
  io.emit("text", 3);
  interval = setInterval(() => {
    if (countdown > 0) io.emit("text", countdown--);
    else {io.emit("text", word); clearInterval(interval);}
  }, 1000);
}

io.on("connection", (socket) => {
  socket.on("click", (arg) => {
    let word = words[Math.floor(Math.random() * words.length)]
    trigger(word);
  });

  socket.on("play", (arg) => {
    try {
      const url = new URL(arg);
      io.emit('play', url.searchParams.get('v'))
    }
    catch{

    }
  });
});




app.use('/style.css', express.static('style.css'));
app.use('/index.js', express.static('index.js'));
app.use('/background.png', express.static('background.png'));

console.log("App Started:");
if (!process.env.PORT) {
  console.log("Hosted on: localhost:3000");
}
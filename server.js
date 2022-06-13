const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');



app.use(express.static('client/build'))


app.get('/', (req, res) => {
res.send(path.resolve(__dirname,'client','build','index.html'))
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.emit('msg','This is a message from server')

  socket.on('disconnect',()=>{
    console.log('a user disconnect')
  })
});

server.listen(5000, () => {
  console.log('listening on *:5000');
});
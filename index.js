const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
app.use(express.static(__dirname + '/templates'));


const { Server } = require('socket.io');
const io = new Server(server);


app.get('/', (req,res) => {
   res.sendFile(__dirname + '/templates/index.html')
});

io.on('connection', (socket) => {
   console.log('Un usuario se conecto '+ socket.id)

   socket.on('chat message', (msg) => {
        console.log('msg '+ msg + ' id '+ socket.id );
        io.emit('chat message', {'id': socket.id, 'msg' :msg});
   });

   socket.on('disconnect', () => {
      console.log('se desconecto')
   });
});

server.listen(8080, () => {
   console.log('Escuchando 8080')
});


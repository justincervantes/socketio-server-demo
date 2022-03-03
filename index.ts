const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const moment = require('moment');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on('connection', (socket) => {
	socket.emit('new-connection', `${socket.id} has joined the fray!`);
});

function emitEvent() {
	const message = `Server event emitted at ${moment().format('h:mma MMMM Do, YYYY')}`;
	io.emit('server-event', message);
	setTimeout(emitEvent, 10 * 1000);
}

setTimeout(emitEvent, 10 * 1000);

httpServer.listen(3000, console.log('Listening on port 3000.'));



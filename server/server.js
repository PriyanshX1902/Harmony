import express from  'express';
const app = express();
import bodyParser from 'body-parser';
import cors from 'cors';
import route from './routes/sample.js';
import {createServer} from 'http';
import {Server} from 'socket.io';
const port = process.env.PORT || 5000;
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
})
/*app.use(
    cors({
        origin: 'http://localhost:3000/',
        credentials: true
    })
);*/
io.on('connection', (socket)=>{
    socket.emit("me", socket.id);

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})

})
app.get('/', (req, res)=>{
    res.send('Hello! This is backend server for Discord - Clone');
})
app.use('/sample', route);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
server.listen(port, console.log('Listening to port 5000!'));

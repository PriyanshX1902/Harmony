import express from  'express';
const app = express();
import bodyParser from 'body-parser';
import cors from 'cors';
import route from './routes/sample.js';
import {createServer} from 'http';
const port = process.env.port || 5000;
const server = createServer(app);
app.use(
    cors({
        origin: 'http://localhost:3000/',
        credentials: true
    })
);
app.get('/', (req, res)=>{
    res.send('Hello! This is backend server for Discord - Clone');
})
app.use('/sample', route);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
server.listen(port, console.log('Listening to port 5000!'));

import express from  'express';
const app = express();
import bodyParser from 'body-parser';
import cors from 'cors';
const port = process.env.port || 5000;

app.use(
    cors({
        origin: 'http://localhost:3000/',
        credentials: true
    })
);
app.get('/', (req, res)=>{
    res.send('Hello!');
})
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.listen(port, console.log('Listening to port 5000!'));

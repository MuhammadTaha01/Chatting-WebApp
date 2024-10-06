import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io';
import { createServer } from 'http'


const PORT = 6969;
const app = express();

app.use(express.json());
app.use(cors());

app.get('/',(req,res) => {
    res.send('Hello World')
});

app.listen(PORT,() => {
    console.log(`Server is running on - port no: ${PORT}`)
})
import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io';
import { createServer } from 'http'


const PORT = 6969;
const app = express();

const server = createServer(app);
app.use(express.json());
app.use(cors());

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['POST','GET'],
        credentials: true
    }
});


app.get('/',(req,res) => {
    res.send('Hello World')
});


io.on('connect', (socket) => {
    console.log(`User Connected - ID: ${socket.id}`)

    socket.emit('welcome',() => {
        console.log(`Welcome to the server`)
    })

    socket.on('message',(data) => {
        console.log('Send messge: ',data);
        socket.broadcast.emit('receive message',data);
    })

    // Listen for a user to join a room
    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`User with ID ${socket.id} joined room: ${roomId}`);
    });

    
    // socket.on('receive message',(data) => {
    //     console.log(data);
    //     io.emit('message',data);
    // })
})


server.listen(PORT,() => {
    console.log(`Server is running on - port no: ${PORT}`)
})
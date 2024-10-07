import React, { useEffect, useMemo, useState } from 'react'
import { io } from 'socket.io-client'

const Home = () => {

    const socket = useMemo(() => io('http://localhost:6969'),[]);
    const [message, setMessage] = useState({
        message: ''
    })
    const [rooms, setRooms] = useState({
        rooms: ''
    })
    const [socketID, setSocketId] = useState('')

    useEffect(()=>{
        socket.on('connect',()=>{
            console.log(`Socket connected to the server - ID is - ${socket.id}`)
            setSocketId(socket.id);
        });

        socket.on('welcome',()=>{
            console.log(`Welcome on to the server`)
        })

        // socket.on('message',(s)=>{
        //     console.log(`Send message: `,s);
        // })

        socket.on('receive message',(s)=>{
            console.log('Received message: ',s);
        })

        // Clean up the socket connection on component unmount
        return () => {
            socket.disconnect();
        };
    },[])

    const handleSumbit = (e) =>
    {
        e.preventDefault();
        socket.emit('message',message)
        // console.log(message);
        setMessage({message: ''});
    }

  return (
    <div className=''>
        <form onSubmit={handleSumbit}>
            <div className="flex flex-col items-center justify-center">
                <h1 className='font-semibold text-[20px]'>Your ID: <span className='font-bold text-[25px]'> {socketID} </span> </h1>

                <label className='font-semibold'>Type Your Message Here:</label>
                <input 
                    type="text" 
                    placeholder='Send Message...' 
                    name="" 
                    id=""
                    value={message.message}
                    className='border-[2px] border-black rounded-xl p-2 w-[50%]'
                    onChange={(e) => setMessage({ message: e.target.value })}
                />

                <label className='font-semibold'>Type Your Room ID Here - On which you want to send the message:</label>
                <input 
                    type="text" 
                    placeholder='Room ID...'
                    name="" 
                    id=""
                    value={rooms.rooms}
                    className='border-[2px] border-black rounded-xl p-2 w-[50%]'
                    onChange={(e) => setRooms({ rooms: e.target.value })}
                />
                <button className='font-semibold bg-blue-300 p-4 rounded-2xl px-10 m-1'>Send</button>
            </div>
        </form>
    </div>
  )
}

export default Home
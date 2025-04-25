const express=require('express');// this package return method
const app=express(); // we call the method and its return object, and it will be stote at app variable.
// now app contain methods and properties which we used in order to create backend application.

const authRouter=require('./controller/authController');
const userRouter=require('./controller/userController');
const chatRouter=require('./controller/chatController');
const messageRouter=require('./controller/messageController');

//use auth controller router
app.use(express.json());  // this is middleware ,it is use to convert req body(coming from api) which is in json to javascript object

const server=require('http').createServer(app) // create server using http module and pass app object to it.

const io=require('socket.io')(server,{cors:
    {origin:'http://localhost:3000', // this is the origin of react app where we are going to use socket io
    methods:['GET','POST'],} // this is the method which we are going to use in socket io.
    
})

app.use('/api/auth',authRouter);   // now url become- root_url/api/auth/signUp ig authrouter contain login then value will be root_url/api/auth/login

app.use('/api/user',userRouter);
app.use('/api/chat',chatRouter);
app.use('/api/message',messageRouter);

 //this is the socket io instance which is used to create socket connection between client and server.
 io.on('connection',socket=>{
        socket.on('send-message-all-client',data=>{
            // console.log('message from client:',data); // this is the message which we are going to send from client to server.
            socket.emit('send-message-from-server',data);
        })
})
module.exports=server;   //export app object


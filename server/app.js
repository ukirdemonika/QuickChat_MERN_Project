const express=require('express');// this package return method
const app=express(); // we call the method and its return object, and it will be stote at app variable.
// now app contain methods and properties which we used in order to create backend application.

const authRouter=require('./controller/authController');
const userRouter=require('./controller/userController');


//use auth controller router
app.use(express.json());  // this is middleware ,it is use to convert req body(coming from api) which is in json to javascript object

app.use('/api/auth',authRouter);   // now url become- root_url/api/auth/signUp ig authrouter contain login then value will be root_url/api/auth/login

app.use('/api/user',userRouter);
module.exports=app;   //export app object


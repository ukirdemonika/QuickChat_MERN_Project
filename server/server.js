const dotenv=require('dotenv');  //npm install dotenv
dotenv.config({path:'./config.env'}); // specify the path of config file.


const app=require('./app');  //import app object
const port=process.env.PORT_NUMBER || 3000;  // process.env contain all environment variable which is created inside config.env file.
app.listen(port,()=>{
    console.log('listening on port no:',port)
}); // its makes our application is ready to listen the incoming req. 
// its accept 2 param: 1st-port no, 2nd-callback function which is used to handling incoming req.
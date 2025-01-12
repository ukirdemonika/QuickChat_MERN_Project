let app=require('./app');  //import app object
const port=3000;
app.listen(port,()=>{
    console.log('listening on port no:',port)
}); // its makes our application is ready to listen the incoming req. 
// its accept 2 param: 1st-port no, 2nd-callback function which is used to handling incoming req.
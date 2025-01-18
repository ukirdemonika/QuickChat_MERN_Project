const mongoose=require('mongoose');

const messageSchema=new mongoose.Schema({
    // get the id of chat which member array contain sender and receiver , coming from chat collection
    chatId:{
        type:mongoose.Schema.Types.ObjectId,ref:'chat'
    },
    //who is sending message
    sender:{
        type:mongoose.Schema.Types.ObjectId,ref:'users'
    },
    text:{
        type:String,
        required:true
    },
    read:{
        type:Boolean
    }
})
module.exports=mongoose.model('messages',messageSchema)
// now this model is used for sending mesage API
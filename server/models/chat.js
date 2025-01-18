const mongoose=require('mongoose');

const chatSchema=new mongoose.Schema({
    members:{
        //here store the object of 2 objectId who are going to chat and the collection is users.
        type:[
           { type:mongoose.Schema.Types.ObjectId, ref:'users'}
        ]
    },
    lastMessage:{
        //here store the objectId of last message from message collection
        type:mongoose.Schema.Types.ObjectId, ref:'message'
    },
    unReadMessageCount:{
        type:Number,
        default:0
    }
},{timestamps:true});
module.exports=mongoose.model('chat',chatSchema);
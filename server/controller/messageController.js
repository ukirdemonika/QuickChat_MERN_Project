//Scenario:Now create api to store messages who one user sending to other user in Db.
// So first sender sending message that msg store in DB.and fetch that msg for receiver.

const router=require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Chat=require('../models/chat');
const Messages=require('../models/messages');

router.post('/new-messages',authMiddleware,async(req,res)=>{
    try{
        //1. Save the message in Db
        const newMessage=await new Messages(req.body);
        const saveMessage=await newMessage.save();

        //2. update the lastmessage of chat collection
        // const currentChat=await Chat.findById(req.body.chatId); //here I get chatId from chat collection which contain senders
        // curretnChat.lastMessage=saveMessage._id;  //this is message_id update to lastmessage in chat collection.
        // await curretnChat.save();

        //OR
        const currentChat=await Chat.findByIdAndUpdate({
            _id:req.body.chatId  //from req chatId coming from message collection find it base on mesage_id 
        },
        {
            lastMessage:saveMessage._id, // update the messge-id to lastmessage of chat collection
            $inc:{unReadMessageCount:1}  // message count increment by one
        })
        res.send({
            message:'Message send successfully',
            success:true,
            data:saveMessage
        })



    }catch(error){
        res.send({
            message:error.message,
            success:false
        })
    }
})
module.exports=router;
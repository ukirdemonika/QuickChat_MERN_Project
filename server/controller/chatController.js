const router=require('express').Router();
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const Chat=require('../models/chat');
const Messages=require('../models/messages');

router.use(express.json()); // Middleware to parse JSON request bodies

router.post('/create_chat_between_members',authMiddleware ,async(req,res)=>{
    try{
        const chatUsers=await new Chat(req.body);
        const saveChat=await chatUsers.save();
        
        await saveChat.populate('members'); //populate the members from chat collection
        res.status(201).send({
            message:'Chat is created successfully',
            success:true,
            data:saveChat
        })

    }catch(error){
        res.status(400).send({
            message:'Chat is not created',
            success:false
        })
    }
})


//get all the chat whose member array contain currently logged in user. and he will chat with other menbers
router.get('/get_all_chats',authMiddleware,async(req,res)=>{
    try{
        //so in postman when we hit url , from authentication token get the userId and attched to req body(logged in user).
        const allChat=await Chat.find({members:{$in:req.body.userId}})
                        .populate('members')
                        .populate('lastMessage')
                        .sort({updatedAt:-1});  //in is a mongoose operator. filter the data base on members array and check currently logged in user
        res.send({
            message:'fetch chat Successfully..',
            success:true,
            data:allChat
        })

    }catch(error){
        res.send({
            message:error.message,
            success:false
        })
    }
})

router.post('/clear-unread-message',authMiddleware,async(req,res)=>{
    try{
        //1. update the unread message count to 0
        const chatId=req.body.chatId; //get chatId from req body
        const chat=await Chat.findById(chatId); //find the chatId from chat collection
        if (!chat) {
            res.send({
                message: 'No chat found with given chatId',
                success: false
            });
        }

    

        const updateChat=await Chat.findByIdAndUpdate(
            chatId,//filter the chatId from chat collection
            //{unReadMessageCount:0}, //update the unread message count to 0
            {
                unReadMessageCount:0
            },
            {
                new:true //return the updated data , if Chat updated successfully, otherwise return new:false.
            }
            
        ).populate('members').populate('lastMessage') //populate the members and last message from chat collection
        
        //2.update the read property of message collection to true
        await Messages.updateMany(
            {chatId:chatId,read:false}, //find the chatId from message collection
            {read:true} //update the isRead property to true
        )

        res.send({
            message:'Unread message count is cleared successfully',
            success:true,
            data:updateChat //return the updated chat data
        })
    }catch(error){
        res.send({
            message:error.message,
            success:false
        })
    }
})
module.exports=router;
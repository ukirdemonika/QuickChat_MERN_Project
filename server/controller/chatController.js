const router=require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Chat=require('../models/chat');

router.post('/create_chat_between_members',authMiddleware ,async(req,res)=>{
    try{
        const chatUsers=await new Chat(req.body);
        const saveChat=await chatUsers.save();
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
        const allChat=await Chat.find({members:{$in:req.body.userId}});  //in is a mongoose operator. filter the data base on members array and check currently logged in user
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
module.exports=router;
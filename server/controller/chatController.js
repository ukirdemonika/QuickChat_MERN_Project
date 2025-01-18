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
module.exports=router;
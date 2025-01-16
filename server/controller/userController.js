const router=require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const User=require('../models/users')

//here we add authMiddleware(Protected api) which contain verify token and return object which contain userId.
//and in middleware assign userId to req userId , so we got userId od selected user.
router.get('/get_logged_users',authMiddleware,async(req,res)=>{
    try{
        const user=await User.findOne({_id:req.body.userId})// filter userId on the basis of _id property of User.
        console.log(req)
        res.send({
            message:'User fetch successfully',
            success:true,
            data:user
        })
    }catch(error){
        res.send({
            message:error.message,
            success:false,
            
        })
    }



})
module.exports=router;

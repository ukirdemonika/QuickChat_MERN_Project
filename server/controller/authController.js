//this file contain routing API- autherization and authentication API
const router=require('express').Router();  //this contain all methods which is require for routing the api
const User=require('../models/users');
const bcrypt=require('bcryptjs');

//second pram- callback function req, res object
router.post('/signUp',async(req,res)=>{
    try{
        //1. check user is already exist in DB
        //find user according to email
        const user=await User.findOne({email:req.body.email});

        //2. if already exist return error message
        if(user){
            return res.send({
                message:'User already Registered..',
                success:false
            })
        }
        //3. set encrypted password from text password which is coming from req.and assign to password of user schema.
        const encrptedPassword=await bcrypt.hash(req.body.password,10);
        req.body.password=encrptedPassword;

        //4. create new user and save into DB and send response
        const newUser=await new User(req.body);
        newUser.save();
        res.send({
            message:'User created successfully..',
            success:true  // set the status of res
        })

    }catch(error){
        res.send({
            message:error.message,
            success:false  // set the status of res
        })
    } 
})

module.exports=router;
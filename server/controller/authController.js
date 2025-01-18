//this file contain routing API- autherization and authentication API
const router=require('express').Router();  //this contain all methods which is require for routing the api
const User=require('../models/users');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const users = require('../models/users');

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
        res.status(201).send({
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

//login API
router.post('/login',async(req,res)=>{
    try{
        //1.Check if user is exist according email
        const user=await User.findOne({email:req.body.email});
       
        if(!user){
            return res.status(400).send({
                message:'User is not registered..',
                success:false
            })

        }

        //2.check password is correct
       const isValid=await bcrypt.compare(req.body.password,user.password)    //req.body.pass: text password and User.pass: encrypted password, its return true OR false
        if(!isValid){
            return res.status(400).send({
            message:'Invalid password',
            success:false
        })
    }

        //3. id user is exist and password is correct then send JWT token
        const token=jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:'5D'})
        res.status(200).send({
            message:'login Successfully',
            success:true,
            token:token
        })
        
    }catch(error){
        res.status(400).send({
            message:error.message,
            success:false
        })
    }
})

module.exports=router;
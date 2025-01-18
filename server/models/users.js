// this file contain:
    // created user scheema, we created following schema, So mongoose will export this schema and tell that in DB create collection which is name as 'user' document
    // and verify that document according to userSchema obj.

const mongoose=require('mongoose');

let userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        select:false, // is res do not send password
        minlength:8
    },
    proflePic:{
        type:String,
        required:false
    }
},{timestamps:true})

module.exports=mongoose.model('users',userSchema); //create users document/collection in Db using userSchema verification.
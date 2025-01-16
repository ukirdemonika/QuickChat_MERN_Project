const jwt=require('jsonwebtoken')
module.exports= (req,res,next)=>{
try{
    //1. split the bearer token which is set in postman like" Bearer  token". so After spliting we get exact token.
    const token=req.headers.authentication.split(' ')[1]; //get token only
     
    //2. once we received token , we need to verify that token using jwt, if valid then decode the token using tokn and secret key which we are using during creating token.
    // once verified , its return object which contain userId.
    const decodedToken=jwt.verify(token,process.env.SECRET_KEY); //return object contain userId=user_id
     console.log(decodedToken)
    //3.assign the user id that we get to the req. userid
    req.body.userId=decodedToken.userId;

    next();   //using this method forwared modified req to next middlware OR route.
}catch(error){

}
}
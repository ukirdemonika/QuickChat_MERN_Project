import { axiosInstance } from "./index";

//signup api call
export const signUpUser=async(user)=>{ 
    try{         
        const response=await axiosInstance.post('/api/auth/signup',user);
        return response.data;
    }catch(error){
        return error;
    }
}

//login api call
export const loginUser=async(user)=>{
    try{
        console.log('response=',user)
        const response = await axiosInstance.post('/api/auth/login', user);
        
        return response.data;
    }catch(error){
        return error;
    }
}
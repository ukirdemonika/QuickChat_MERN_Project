import { axiosInstance } from "."

export const getLoggedInUsers=async()=>{
    try{
        const response=await axiosInstance.get('/api/user/get_logged_users');
        return response.data;
    }catch(error){
        return error;
    }
}
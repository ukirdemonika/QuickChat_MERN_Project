import { axiosInstance } from ".";

export const getAllChats=async()=>{
    try{
        const response=await axiosInstance.get('/api/chat//get_all_chats');
        return response.data;
    }catch(error){
        return error;
    }
}
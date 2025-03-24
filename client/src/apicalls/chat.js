import { axiosInstance } from ".";

export const getAllChats=async()=>{
    try{
        const response=await axiosInstance.get('/api/chat//get_all_chats');
        return response.data;
    }catch(error){
        return error;
    }
}
//create chat
export const createNewChat=async(members)=>{
    try{
        const response=await axiosInstance.post('/api/chat/create_chat_between_members',{members})
        return response.data;
    }catch(error){
        return error;
    }
}
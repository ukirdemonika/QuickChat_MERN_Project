import react from 'react';
import { useSelector } from 'react-redux';
import './chat.css';
function ChatArea(){
    const{selectedChat,user:currentUser}=useSelector(state=>state.userReducer);
    //chat is selected chat, and user is current user.
    //selectedUserChat is the chat which is selected by the user, and it is the member of the selected chat.
    const selectedUserChat=selectedChat.members.find(m=>m._id !== currentUser._id);//get chat object of selected user. 
    return(
        <>
            {selectedChat && <div className='chat-area'>
                <div className='chat-header'>
                {selectedUserChat.firstName} {selectedUserChat.lastName}
                </div>
                <div className='chat-body'>
                chat text
                </div>
                <div className='chat-footer'>
                send button
                </div>
                </div>
            }
        </>
    )
}
export default ChatArea;

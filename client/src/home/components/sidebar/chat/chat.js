import react from 'react';
import { useSelector } from 'react-redux';
function Chat(){
    const{selectedChat}=useSelector(state=>state.userReducer);
    return(
        <div className="chat-container">
            {selectedChat && <h1>{selectedChat._id}</h1>}
        </div>
    )
}
export default Chat;

import react, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './chat.css';
import { createNewMessage, getAllMessages } from "../../../../apicalls/messages";
import { showLoader, hideLoader } from "../../../../redux/loaderSlice";
import toast from 'react-hot-toast';
function ChatArea() {
    const { selectedChat, user: currentUser } = useSelector(state => state.userReducer);
    //chat is selected chat, and user is current user.
    //selectedUserChat is the chat which is selected by the user, and it is the member of the selected chat.
    const selectedUserChat = selectedChat.members.find(m => m._id !== currentUser._id);//get chat object of selected user. 
    const [message, setMessage] = react.useState('');
    const [allMessages, setAllMessages] = react.useState([]);
    const dispatch = useDispatch()

    async function sendMessageFromApi() {
        let response = null;
        try {

            let newMessage = {
                chatId: selectedChat._id,
                sender: currentUser._id,
                text: message
            }
            dispatch(showLoader());
            response = await createNewMessage(newMessage);
            dispatch(hideLoader());
            if (response.success) {
                setMessage('');
            }
        } catch (error) {
            dispatch(hideLoader());
            toast.error(response.message);
        }
    }

    async function getAllMessagesFromDB() {
        let response = null;
        try {
            dispatch(showLoader());
            response = await getAllMessages(selectedChat._id);
            dispatch(hideLoader());
            if (response.success) {
                setAllMessages(response.data);
            }
        } catch (error) {
            dispatch(hideLoader());
            toast.error(response.message);
        }
    }
    //get all messages from db when selected chat is changed & initially when page load.
    //selected chat is the chat which is selected by the user.
    useEffect(() => {
        getAllMessagesFromDB();
    }, [selectedChat]); //when selected chat is changed, then get all messages from db.

    return (
        <>
            {selectedChat && <div className='chat-area'>
                <div className='chat-header'>
                    {selectedUserChat.firstName} {selectedUserChat.lastName}
                </div>
                <div className='chat-area'>
                    {allMessages.map(msg => {
                        
                        let isCurrentUserSender= msg.sender === currentUser._id; //check if the current user is sender of the message.
                        return <div className='message-container' style={isCurrentUserSender?{justifyContent:'end'}:{justifyContent:'start'}} >
                            <div className={isCurrentUserSender?"send-message":"receive-message"}>
                                {msg.text}
                            </div>
                        </div>
                    })
                    }
                </div>
                <div className='send-message-div'>
                    <input type='text' className='send-message-input' placeholder='Type a message...'
                        value={message}
                        onChange={(e) => { setMessage(e.target.value) }} />
                    <button className="fa fa-paper-plane send-message-btn"
                        aria-hidden="true" onClick={sendMessageFromApi}></button>

                </div>
            </div>
            }
        </>
    )
}
export default ChatArea;

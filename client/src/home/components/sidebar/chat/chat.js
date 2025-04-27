import react, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './chat.css';
import { createNewMessage, getAllMessages } from "../../../../apicalls/messages";
import { showLoader, hideLoader } from "../../../../redux/loaderSlice";
import toast from 'react-hot-toast';
import moment from 'moment';
import { clearUnreadMessageCount } from '../../../../apicalls/chat';
import { setSelectedChat } from '../../../../redux/userSlice';
import store from '../../../../redux/store';
function ChatArea({socket}) {
    const { selectedChat, user: currentUser, allChats } = useSelector(state => state.userReducer);
    //chat is selected chat, and user is current user.
    //selectedUserChat is the chat which is selected by the user, and it is the member of the selected chat.
    const selectedUserChat = selectedChat.members.find(m => m._id !== currentUser._id);//get chat object of selected user. 
    const [message, setMessage] = react.useState('');
    const [allMessages, setAllMessages] = react.useState([]);
    const dispatch = useDispatch()

    async function sendMessageFromApi() {
        
        try {

            let newMessage = {
                chatId: selectedChat._id,
                sender: currentUser._id,
                text: message
            }
            //send message to socket server with the new message object and members array.
           socket.emit('send-message', {
            ...newMessage,
            members: selectedChat.members.map(m => m._id), // Spread the newMessage object and add members array with member IDs.
            read: false, // Indicate that the message is unread initially.
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss') // Add a timestamp for when the message was created.
           });

           const  response = await createNewMessage(newMessage);
            
            if (response.success) {
                setMessage('');
            }
        } catch (error) {
            
            toast.error(error.message);
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
    function formatTime(timestamp) {

        const now = moment().startOf('day'); // Get the start of the current day
        const diff = now.diff(moment(timestamp).startOf('day'), 'days'); // Get the difference in days
        if (diff < 1) {
            return `Today ${moment(timestamp).format('hh:mm A')}`; //if difference is less than 1 day, then show time in hh:mm A format.
        }
        else if (diff === 1) {
            return `Yesterday ${(moment(timestamp).format('hh:mm A'))}`; //if difference is 1 day, then show Yesterday.
        } else {
            return moment(timestamp).format('MMM D hh:mm A'); //if difference is more than 1 day, then show date in MMM hh:mm A format.
        }
    }

    //clear the unread message count when user open the chat.
    async function clearUnReadMessage() {
        let response = null;
        try {
            dispatch(showLoader());
            response = await clearUnreadMessageCount(selectedChat._id);
            dispatch(hideLoader());
            if (response.success) {
                allChats.map(chat => {
                    if (chat._id === selectedChat._id) { //check if chat id is same as selected chat id.
                        setSelectedChat(response.data); //update the selected chat with new data.
                    }
                    return chat;//return chat object.
                })
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
        
        if(selectedChat?.lastMessage?.sender !== currentUser._id){ 
            clearUnReadMessage();//clear the unread message count when user open the chat.
        }
        
        socket.off('receive-message').on('receive-message', (message) => {
            let selectedChat = store.getState().userReducer.selectedChat; //get the selected chat from store.
            if (selectedChat._id === message.chatId) {
            setAllMessages(prevmsg => [...prevmsg, message]); // Update the state with the new message
            }
            console.log('Received message:', message); // Log the received message for debugging
        });
       
    }, [selectedChat]); //when selected chat is changed, then get all messages from db.


    //auto scroll down when new messahe arrived
    useEffect(() => {
        let msgContainer=document.getElementById('chat-area');
        msgContainer.scrollTop = msgContainer.scrollHeight; // This means the scroll position of the chat area is set to its maximum height, effectively scrolling to the bottom.
        //scroll to the bottom of the chat area when new message is received.
    },[allMessages])
    return (
        <>
            {selectedChat && <div className='chat-container'>
                <div className='chat-header'>
                    {selectedUserChat.firstName} {selectedUserChat.lastName}
                </div>
                <div className='chat-area' id='chat-area'>
                    {allMessages.map(msg => {

                        let isCurrentUserSender = msg.sender === currentUser._id; //check if the current user is sender of the message.
                        return <div className='message-container' style={isCurrentUserSender ? { justifyContent: 'end' } : { justifyContent: 'start' }} >
                            <div className='message-area'>
                                <div className={isCurrentUserSender ? "send-message" : "receive-message"}>
                                    {msg.text}
                                </div>
                                <div style={isCurrentUserSender ? { float: 'right' } : { float: 'left' }} className='message-time'>
                                    {formatTime(msg.createdAt)}
                                    
                                    {isCurrentUserSender && (
                                        msg.read &&
                                            
                                            <i className='fa fa-check-circle' aria-hidden="true" style={{color:"#e74c3c"}}></i>
                                    )}
                                </div>
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

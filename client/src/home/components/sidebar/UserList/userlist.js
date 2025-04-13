import { useDispatch, useSelector } from "react-redux";
import './userlist.css';
import toast from "react-hot-toast";
import { hideLoader, showLoader } from "../../../../redux/loaderSlice";
import { createNewChat } from "../../../../apicalls/chat";
import { setAllChats, setSelectedChat } from "../../../../redux/userSlice";
import moment from "moment";

function UserList({ searchKey }) {
    //create alise for user as a currentUser
    const { allUsers, allChats, user: currentUser, selectedChat } = useSelector(state => state.userReducer);
    // console.log(allUsers)
    const dispatch = useDispatch();
    function formatName(user) {

        let firstName = user?.firstName.charAt(0).toUpperCase() + user?.firstName.slice(1).toLowerCase();
        let lastName = user?.lastName.charAt(0).toUpperCase() + user?.lastName.slice(1).toLowerCase();
        return firstName + ' ' + lastName;
    }

    //call to create new chat api function when we click on start chat button
    const startNewChat = async (searchUserId) => {
        let response = null;
        try {
            dispatch(showLoader());
            //pass the members array which contain current user id and search use id.
            response = await createNewChat([currentUser._id, searchUserId]);
            dispatch(hideLoader());
            if (response.success) {
                toast.success(response.message);
                //create newChat variable, and update the store with allchat slice which contain all members array who is doing chat
                const newChat = response.data;
                const updateWithNewChat = [...allChats, newChat] //this contain all members 
                //update in the store, now allChats contain all the members who are doing chats.
                dispatch(setAllChats(updateWithNewChat));
                dispatch(setSelectedChat(newChat)); //open the chat with current user and search user id.
            }
        } catch (error) {
            toast.error(response.message);
            dispatch(hideLoader())
        }
    }

    //open selected chat with current user and search user id
    const openSelectedChat = (selectedUser_Id) => {
        console.log(selectedUser_Id);
        //find the chat which contain current user id and search user id, if chat is found then open the chat.
        //allChats contain all the members who are doing chat, and selectedUser_Id is the id of search user.
        const chat = allChats.find(chat => chat.members.map(m => m._id).includes(selectedUser_Id) &&
            chat.members.map(m => m._id).includes(currentUser._id));
        if (chat) {
            //if chat is found then open the chat.
            dispatch(setSelectedChat(chat));
        }

    }

    const IsUserSelectedChat = (user) => {
        //check if selected chat is not null, then return true or false.
        // console.log("Selected chat:", selectedChat);
        if (selectedChat) {
            return selectedChat.members.map(m => m._id).includes(user._id); //check if user id is present in the selected chat members array.
        }
        return false;
        
    }

    const getlastMessages=(userId)=>{
        
        const chat=allChats.find(chat=>chat.members.map(m=>m._id).includes(userId));//find the chat which contain current user id and search user id.
        if(!chat || !chat.lastMessage){
            return ''
        }else{
            //if chat is found then check if the last message is sent by current user or not.
           //if last message is sent by current user then return 'You' else return the last message.
            const msgPrefix=chat?.lastMessage?.sender === currentUser._id ? 'You: ':'';
            return msgPrefix+chat?.lastMessage?.text?.substring(0,25);
        }
    }
    const getMessageTimeStamp=(userId)=>{
        const chat=allChats.find(chat=>chat.members.map(m=>m._id).includes(userId));//find the chat which contain current user id and search user id.
        if(!chat || !chat.lastMessage){
            return ''
        }else{
           return moment(chat?.lastMessage?.createdAt).format('hh:mm A');//if chat is found then return the last message timestamp.
        }
    }
    return (

        allUsers.filter(user =>

            //filter thoose user which contain first or last name
            (
                (user.firstName.toLowerCase().includes(searchKey.toLowerCase()) ||
                    user.lastName.toLowerCase().includes(searchKey.toLowerCase())) && searchKey
            ) ||
            //display existing chat with current user doing with other users, some is method which iterated every item from array.
            (allChats.some(chat => chat.members.map(m => m._id).includes(user._id)))
        ).map(user => {
            return <div className="user-search-filter" onClick={() => openSelectedChat(user._id)} key={user._id}>

              <div className={IsUserSelectedChat(user) ? 'selected-user' : 'filtered-user'} >
                    <div className="filter-user-display">
                        {user.profilePic && <img src={user.profilePic} alt="Profile pic" className="user-profile-image" />}
                        {!user.profilePic && <div className={IsUserSelectedChat(user)?'user-selected-profile-pic':"user-default-profile-pic"}>
                            {
                                user.firstName.charAt(0).toUpperCase() +
                                user.lastName.charAt(0).toUpperCase()
                            }
                        </div>}
                        <div className="filter-user-details">
                            <div className="user-display-name">
                                {
                                    formatName(user)
                                }
                            </div>
                            <div className="user-display-email">{getlastMessages(user._id) || user.email}</div>
                           
                        </div>
                        <div className="message-timestamp">{getMessageTimeStamp(user._id)}</div>
                        {!allChats.find(chat => chat.members.map(m => m._id).includes(user._id)) &&
                            <div className="user-start-chat">
                                <button className="user-start-chart-btn"
                                    // pass search user as a param, allUser contain logic of searchuser
                                    onClick={() => startNewChat(user._id)}>Start chat</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        })

    )
}
export default UserList;
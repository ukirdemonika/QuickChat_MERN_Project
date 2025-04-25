import { useSelector } from "react-redux";
import Header from "./components/header/header";
import ChatArea from "./components/sidebar/chat/chat";
import Sidebar from "./components/sidebar/sidebar";
import './index.css';
import io from  "socket.io-client";
import { useEffect } from "react";
function Home(){
    const{selectedChat,user}=useSelector(state=>state.userReducer);
    const socket = io('http://localhost:5000') //connect to socket server
    useEffect(()=>{
        if(user){
            socket.emit('join-room',user._id) //join the room with current logged in user id
            socket.emit('send-message',{text: 'Hello Steve', recepient:'680404012528b0e5f7895740'})//send msg to steve only with id
            socket.on('receive-message', (data) => {
                console.log(data);
            })
        }
        
    },[user])
    return (
        <div className="home-page">
            <Header></Header>
            <div className="main-content">
                <Sidebar></Sidebar>
                {selectedChat && <ChatArea></ChatArea>}
            </div>
        </div>
    )
}
export default Home;
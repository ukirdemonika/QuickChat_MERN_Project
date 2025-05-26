import { useSelector } from "react-redux";
import Header from "./components/header/header";
import ChatArea from "./components/sidebar/chat/chat";
import Sidebar from "./components/sidebar/sidebar";
import './index.css';
import io from  "socket.io-client";
import { useEffect } from "react";
import { useState } from "react";

const socket = io('http://localhost:5000');//connect to socket server


function Home(){
    const{selectedChat,user}=useSelector(state=>state.userReducer);
    // let socket=useContext(SocketContext);
    const [userList, setUserList] = useState([]);
    useEffect(()=>{
        if(user){
            socket.emit('join-room',user._id) //join the room with current logged in user id
            socket.emit('user-login',user._id) //emit user login event with user id
            socket.on('online-users',(onlineUsers)=>{
                setUserList(onlineUsers);
            })
        }
        
    },[user])
    return (
        <div className="home-page">
            <Header></Header>
            <div className="main-content">
                <Sidebar socket={socket} userList={userList}></Sidebar>
                {selectedChat && <ChatArea socket={socket}></ChatArea>}
            </div>
        </div>
    )
}
export default Home;
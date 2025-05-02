import { useSelector } from "react-redux";
import Header from "./components/header/header";
import ChatArea from "./components/sidebar/chat/chat";
import Sidebar from "./components/sidebar/sidebar";
import './index.css';
import io from  "socket.io-client";
import { useContext, useEffect } from "react";
import SocketContext from "../context/socketContext";

// const socket = io('http://localhost:5000');//connect to socket server

function Home(){
    const{selectedChat,user}=useSelector(state=>state.userReducer);
    let socket=useContext(SocketContext);
    useEffect(()=>{
        if(user){
            socket.emit('join-room',user._id) //join the room with current logged in user id
            
        }
        
    },[user])
    return (
        <div className="home-page">
            <Header></Header>
            <div className="main-content">
                <Sidebar socket={socket}></Sidebar>
                {selectedChat && <ChatArea socket={socket}></ChatArea>}
            </div>
        </div>
    )
}
export default Home;
import { useSelector } from "react-redux";
import Header from "./components/header/header";
import ChatArea from "./components/sidebar/chat/chat";
import Sidebar from "./components/sidebar/sidebar";
import './index.css';
import io from  "socket.io-client";
import { useEffect } from "react";
function Home(){
    const{selectedChat}=useSelector(state=>state.userReducer);
    const socket = io('http://localhost:5000') //connect to socket server
    useEffect(()=>{
        socket.emit('send-message-all-client',{text:'Hello from abc'});
        socket.on('send-message-from-server',(data)=>{
            console.log('message from server:',data);
        })
    },[])
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
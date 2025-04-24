import { useSelector } from "react-redux";
import Header from "./components/header/header";
import ChatArea from "./components/sidebar/chat/chat";
import Sidebar from "./components/sidebar/sidebar";
import './index.css';
import io from  "socket.io-client";
function Home(){
    const{selectedChat}=useSelector(state=>state.userReducer);
    const socket = io('http://localhost:5000') //connect to socket server
    socket.on('connect', () => {
        console.log('Connected to socket server');
    });
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
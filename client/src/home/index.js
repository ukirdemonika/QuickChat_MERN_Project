import { useSelector } from "react-redux";
import Header from "./components/header/header";
import ChatArea from "./components/sidebar/chat/chat";
import Sidebar from "./components/sidebar/sidebar";
import './index.css';
function Home(){
    const{selectedChat}=useSelector(state=>state.userReducer);
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
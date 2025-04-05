import Header from "./components/header/header";
import Chat from "./components/sidebar/chat/chat";
import Sidebar from "./components/sidebar/sidebar";
import './index.css';
function Home(){
    return (
        <div className="home-page">
            <Header></Header>
            <div className="main-content">
                <Sidebar></Sidebar>
                <Chat></Chat>
            </div>
        </div>
    )
}
export default Home;
import Search from "./search/search";
import './sidebar.css'
import { useState } from "react";
import UserList from "./UserList/userlist";
import { useContext } from "react";
import SocketContext from "../../../context/socketContext";

function Sidebar({socket, userList}) {
    // let socket=useContext(SocketContext);
    const [searchKey, setSearchKey] = useState('');
    return (
        <div className="sidebar-container">
            <Search
                searchKey={searchKey}
                setSearchKey={setSearchKey}>
            </Search>
            {/* //search user and get user list */}
            <UserList searchKey={searchKey} socket={socket} userList={userList}></UserList>
        </div>
    )
}
export default Sidebar;
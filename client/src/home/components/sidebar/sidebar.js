import Search from "./search/search";
import './sidebar.css'
import { useState } from "react";
import UserList from "./UserList/userlist";
function Sidebar() {
    const [searchKey, setSearchKey] = useState('');
    return (
        <div className="sidebar-container">
            <Search
                searchKey={searchKey}
                setSearchKey={setSearchKey}>
            </Search>
            {/* //search user and get user list */}
            <UserList searchKey={searchKey}></UserList>
        </div>
    )
}
export default Sidebar;
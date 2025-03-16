import Search from "./search/search";
import './index.css'
import { useState } from "react";
function Sidebar() {
    const [searchKey, setSearchKey] = useState('');
    return (
        <div className="sidebar-container">
            <Search
                searchKey={searchKey}
                setSearchKey={setSearchKey}>
            </Search>
        </div>
    )
}
export default Sidebar;
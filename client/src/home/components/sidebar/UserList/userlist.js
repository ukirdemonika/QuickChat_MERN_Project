import { useSelector } from "react-redux";
import './userlist.css';

function UserList({searchKey}){
    const {allUsers}=useSelector(state=>state.userReducer);
    // console.log(allUsers)
    function formatName(user){
        let firstName=user?.firstName.charAt(0).toUpperCase()+user?.firstName.slice(1).toLowerCase();
        let lastName=user?.lastName.charAt(0).toUpperCase() + user?.lastName.slice(1).toLowerCase();
        return firstName+' ' +lastName;
    }
    return (
        allUsers.filter(user=>
            //filter thoose user which contain first or last name
            (user.firstName.toLowerCase().includes(searchKey.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchKey.toLowerCase())) && searchKey
        ).map(user=>{
            //  <div className="user-search-filter">
            return <div className="filtered-user">
                <div className="filter-user-display">
                    {user.profilePic && <img  src={user.profilePic} alt="Profile pic" className="user-profile-image"/>}
                    {!user.profilePic && <div className="user-default-profile-pic">
                        {
                            user.firstName.charAt(0).toUpperCase()+
                            user.lastName.charAt(0).toUpperCase()
                        }
                    </div>}
                    <div className="filter-user-details">
                        <div className="user-display-name">
                            {
                                formatName(user)
                            }
                        </div>
                        <div className="user-display-email">{user.email}</div>
                    </div>
                    <div className="user-start-chat">
                        <button className="user-start-chart-btn">Start chat</button>
                    </div>
                </div>
            </div>
        // </div>
        })
      
    )
}
export default UserList;
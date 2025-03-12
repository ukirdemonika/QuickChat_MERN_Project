import { useSelector } from 'react-redux';
import './header.css';
function Header(){
    //step 4 call the store which contain userReduce and its contain updated value of user object.
    const {user}=useSelector(state=>state.userReducer)
    function getfullName(){
        let fname=user?.firstName.at(0).toUpperCase()+user?.firstName.slice(1).toLowerCase();
        let lname=user?.lastName.at(0).toUpperCase()+user?.lastName.slice(1).toLowerCase();
        return fname+' '+lname;
    }
    function getInitials(){
        let fname=user?.firstName.toUpperCase()[0];
        let lname=user?.lastName.toUpperCase()[0];
        return fname+lname;
    }
    return (
        <div className="app-header">
            <div className="app-logo">
                <i className="fa fa-comments" aria-hidden="true"></i>
                Quick Chat
            </div>
            <div className="app-user-profile">
                {/* <img className='logged-user-profile-pic'></img> */}
                <div className='logged-user-profile-pic'>{getInitials()}</div>
                <div className='logged-user-name'>{getfullName()}</div>
                <button className='logout-button'>
                <i className="fa fa-power-off"></i>
                </button>
            </div>
        </div>
    )
}
export default Header;
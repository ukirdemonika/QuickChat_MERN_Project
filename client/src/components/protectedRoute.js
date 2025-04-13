import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getAllUsers, getLoggedInUsers } from "../apicalls/users";
import { useDispatch} from "react-redux";
import { hideLoader, showLoader } from "../redux/loaderSlice";
import { setUser ,setAllUsers,setAllChats} from "../redux/userSlice";
import toast from "react-hot-toast";
import { getAllChats } from "../apicalls/chat";

function ProtectedRoute({children}){
    // console.log("Children:", children);
    //step 3 dispatch the action which are going to update  in the store.
    // let[user,setUsers]=useState(null);
    
    // const { user } = useSelector(state => state.userReducer);
    const dispatch=useDispatch();

    const navigate=useNavigate();

    const getLoggedUsers=async()=>{
        let response=null;
        try{
            dispatch(showLoader());
            response=await getLoggedInUsers();
            dispatch(hideLoader());
            if(response.success){
                // setUsers(response.data);
                //here we dispatch the action and send the data to store, and assign to action.payload in the userslice state
                dispatch(setUser(response.data));
            }else{
                toast.error(response.message);
                navigate('/login');
            }
        }catch(error){ 
            dispatch(hideLoader());
            navigate('/login');
        }
    }

    const getAllUsersFormDb=async()=>{
        let response=null;
        try{
            dispatch(showLoader());
            response=await getAllUsers();
            dispatch(hideLoader());
            if(response.success){
                dispatch(setAllUsers(response.data))

            }else{
               
                toast.error(response.message);
                navigate('./login');
            }
        }catch(error){
            dispatch(hideLoader());
            navigate('./login');
        }
    }

    //get all the chats
    const getAllChatsfromDb=async()=>{
       
        try{
            const response=await getAllChats();
            if(response.success){
                //dispatch the event and store the response in allchat state which is in store so allchat is accessble in whole app.
                dispatch(setAllChats(response.data));
            }
        }catch(error){
            navigate('/login');
        }
    }
    //this hook called first
    useEffect(()=>{
        if(localStorage.getItem('token')){
            //get the current user details
            getLoggedUsers();
            getAllUsersFormDb();
            getAllChatsfromDb();
        }else{
            navigate('/login')
        }
    },[])
    return(
        <div>
            {children}
        </div>
    )
}
export default ProtectedRoute;
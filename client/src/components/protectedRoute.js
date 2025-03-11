import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getLoggedInUsers } from "../apicalls/users";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../redux/loaderSlice";

function ProtectedRoute({children}){
    let[user,setUsers]=useState(null);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const getLoggedUsers=async()=>{
        let response=null;
        try{
            dispatch(showLoader());
            response=await getLoggedInUsers();
            dispatch(hideLoader());
            if(response.success){
                setUsers(response.data);
            }else{
                navigate('/login');
            }
        }catch(error){
            dispatch(hideLoader());
            navigate('/login');
        }
    }
    useEffect(()=>{
        if(localStorage.getItem('token')){
            //get the current user details
            getLoggedUsers();
        }else{
            navigate('/login')
        }
    },[])
    return(
        <div>
            <p>Name:{user?.firstName+' '+user?.lastName}</p>
            {children}
        </div>
    )
}
export default ProtectedRoute;
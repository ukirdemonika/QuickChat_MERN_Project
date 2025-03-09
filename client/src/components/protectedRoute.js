import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getLoggedInUsers } from "../apicalls/users";

function ProtectedRoute({children}){
    let[user,setUsers]=useState(null);
    const navigate=useNavigate();

    const getLoggedUsers=async()=>{
        let response=null;
        try{
            response=await getLoggedInUsers();
            if(response.success){
                setUsers(response.data);
            }else{
                window.location.href='/login';
            }
        }catch(error){
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
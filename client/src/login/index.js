import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../apicalls/auth";


function Login(){
    const [user,setUser]=useState({
        //in req body of bckend required email and password.
        email:"",
        password:""
    })

   async function onFormSubmit(event){
           event.preventDefault();
           let response=null;
           try{
               response=await loginUser(user);
               if(response.success){
                   alert(response.message);
               }else{
                   alert(response.message);
               }
           }catch(error){
               alert(response.message);
           }
          
       }
    return (
        <div className="container background-image ">
            <div className="container-back-color">
                <div className="card-layout">
                    <div className="card">
                        <div className="card-label">
                           Login Here
                        </div>
                        <form  className="form" onSubmit={onFormSubmit}>
                        

                        {/* email and password */}
                        <div className="email-column">
                            <input type="email" alt="Email" placeholder="Email.."
                            value={user.email}
                            onChange={(e)=>setUser({...user,email:e.target.value})}></input>
                            <input type="password" alt="Password" placeholder="Password.."
                            value={user.password}
                            onChange={(e)=>setUser({...user,password:e.target.value})}></input>
                        </div>

                        {/* signup button */}
                        <div className="mb-2">
                            <button>Login</button>
                        </div>
                        </form>
                        <div className="card-terms">
                            <p>Don't have Account yet?</p>
                            <Link className="p-login" to="/signup">Signup Here</Link>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>



    )
}
export default Login;
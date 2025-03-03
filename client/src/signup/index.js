import { useState } from "react";
import './signUp.css';
import { Link } from "react-router-dom";
import { signUpUser } from "../apicalls/auth";

function Signup() {
    const [user, setUser]=useState({
        // this schema exactly same in backend user schema.
        firstName:'',
        lastName:'',
        email:'',
        password:''
    });

    async function onFormSubmit(event){
        event.preventDefault();
        let response=null;
        try{
            response=await signUpUser(user);
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
                            Create Account
                        </div>
                        <form  className="form" onSubmit={onFormSubmit}>
                        {/* name input */}
                        <div className="column">
                            
                            <input
                                type="text" alt="firstname" placeholder="Firstname.."
                                value={user.firstName}
                                //all value from user and get the value of firstname
                                onChange={(e)=>setUser({...user,firstName:e.target.value})}></input>
                            <input
                                type="text" alt="lastname" placeholder="Lastname.."
                                value={user.lastName}
                                onChange={(e)=>setUser({...user,lastName:e.target.value})}></input>


                        </div>

                        {/* email and password */}
                        <div className="email-column">
                            <input
                                type="email" alt="Email" placeholder="Email.."
                                value={user.email}
                                onChange={(e)=>setUser({...user,email:e.target.value})}></input>
                            <input
                                type="password" alt="Password" placeholder="Password.."
                                value={user.password}
                                onChange={(e)=>setUser({...user,password:e.target.value})}></input>
                        </div>

                        {/* signup button */}
                        <div className="mb-2">
                            <button>Sign Up</button>
                        </div>
                        </form>
                        <div className="card-terms">
                            <p>Already have an account?</p>
                            <Link className="p-login" to="/login">Login Here</Link>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Signup;
import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../apicalls/auth";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../redux/loaderSlice";


function Login() {
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        //in req body of bckend required email and password.
        email: "",
        password: ""
    })
   

    async function onFormSubmit(event) {
        event.preventDefault();
        let response = null;
        try {
            dispatch(showLoader());
            response = await loginUser(user);
            dispatch(hideLoader())
            if (response.success) {
                toast.success(response.message);
                localStorage.setItem('token', response.token);
                window.location.href = '/';
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            dispatch(hideLoader())
            toast.error(response.message);
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
                        <form className="form" onSubmit={onFormSubmit}>


                            {/* email and password */}
                            <div className="email-column">
                                <input type="email" alt="Email" placeholder="Email.."
                                    value={user.email}
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}></input>
                                <input type="password" alt="Password" placeholder="Password.."
                                    value={user.password}
                                    onChange={(e) => setUser({ ...user, password: e.target.value })}></input>
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
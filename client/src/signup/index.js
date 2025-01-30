

function Signup() {
    return (
        <div className=" relative h-screen background-image bg-cover ">
            <div className="absolute inset-0 bg-red-500 bg-opacity-50">
                <div className="flex  justify-center items-center min-h-screen w-[90%]">
                    <div className="bg-white h-auto w-[90%] max-w-[400px] rounded-md p-4 shadow-lg">
                        <div className="font-extrabold text-center text-2xl m-2 p-1">
                            Create Account
                        </div>
                        {/* name input */}
                        <div className="flex md:flex-row flex-col gap-1 justify-center mb-1 m-0">

                            <input className="bg-slate-200 border-none outline-none h-10 w-full px-4  text-sm m-0 rounded-sm"
                                type="text" alt="firstname" placeholder="Enter Firstname.."></input>
                            <input className="bg-slate-200 border-none outline-none h-10 w-full px-4 text-sm m-0 rounded-sm"
                                type="text" alt="lastname" placeholder="Enter Lastname.."></input>


                        </div>

                        {/* email and password */}
                        <div className="flex flex-col space-y-1 md:space-y-1 mb-2">
                            <input className="bg-slate-200 border-none outline-none h-10 w-full px-4  text-sm rounded-sm"
                                type="email" alt="Email" placeholder="Enter Email.."></input>
                            <input className="bg-slate-200 border-none outline-none h-10 w-full px-4  text-sm rounded-sm"
                                type="password" alt="Password" placeholder="Enter Password.."></input>
                        </div>

                        {/* signup button */}
                        <div className="mb-2">
                            <button className="w-full bg-red-500 text-white py-1 rounded-md font-semibold hover:bg-blue-500 focus:outline-none 
                                                focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 duration-300"
                                    type="button">Sign Up</button>
                        </div>
                        <div className="mb-2 flex justify-center  gap-2">
                            <p className="text-gray-600">Already have an account?</p>
                            <p className="text-blue-800 underline cursor-pointer">Login Here</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>




    )
}
export default Signup;
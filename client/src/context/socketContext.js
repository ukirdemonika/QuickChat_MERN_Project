import { createContext } from "react";
import { io } from "socket.io-client";


let SocketContext=createContext({
    // socket:'', //connect to socket server
});
export default SocketContext;
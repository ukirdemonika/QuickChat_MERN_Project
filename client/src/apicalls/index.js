import axios from "axios";
//while sending req we need to add header which contain token which was usefule while sending chat etc other protected route.
export const axiosInstance=axios.create({
    headers:{
        authorization:`Bearer ${localStorage.getItem('token')}`
    }
});
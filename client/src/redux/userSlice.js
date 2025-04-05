import { createSlice } from "@reduxjs/toolkit";
//step1- create state using createSlice which contain state and actions
const usersSlice=createSlice({
    name:'user',
    initialState:{
        user:null,
        allUsers:[],
        allChats:[],
        selectedChat:null
    },
    //here action.payload contain user object which is coming from dispatch(res.data), dispatch means send the data to action and update the state.
    //setUser is same as setUser in useState() hook.
    reducers:({
        setUser:(state,action)=>{state.user=action.payload;},
        setAllUsers:(state,action)=>{state.allUsers=action.payload},
        setAllChats:(state,action)=>{state.allChats=action.payload},
        setSelectedChat:(state,action)=>{state.selectedChat=action.payload;},
    })
})
export const {setUser,setAllUsers,setAllChats,setSelectedChat}=usersSlice.actions;
export default usersSlice.reducer;


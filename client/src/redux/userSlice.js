import { createSlice } from "@reduxjs/toolkit";
//step1- create state using createSlice which contain state and actions
const usersSlice=createSlice({
    name:'user',
    initialState:{
        user:null
    },
    //here action.payload contain user object which is coming from dispatch(res.data), dispatch means send the data to action and update the state.
    //setUser is same as setUser in useState() hook.
    reducers:({
        setUser:(state,action)=>{state.user=action.payload;}
    })
})
export const {setUser}=usersSlice.actions;
export default usersSlice.reducer;


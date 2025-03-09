import { createSlice } from "@reduxjs/toolkit";

const loaderState=createSlice({
    name:'loader',
    initialState:false,
    reducers:({
        showLoader:(state)=>{state.loader=true;},
        hideLoader:(state)=>{state.loader=false;}
    })
})
export const {showLoader,hideLoader} =loaderState.actions;
export default loaderState.reducer;
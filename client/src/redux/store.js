import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from './loaderSlice';
import userReducer from './userSlice';
//step 2 create store , which contain all state and actions
const store=configureStore({
    reducer:{loaderReducer,userReducer}
})
export default store;
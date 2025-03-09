import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from './loaderState';
const store=configureStore({
    reducer:{loaderReducer}
})
export default store;
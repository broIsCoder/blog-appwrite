import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import alertSlice from "./alertSlice";
import postSlice from "./postSlice";

const store = configureStore({
    reducer:{
        auth:authSlice,
        alert:alertSlice,
        posts:postSlice
    }
});

export default store;
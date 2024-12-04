import { configureStore } from "@reduxjs/toolkit";
import  session  from "./session";

export default configureStore({
    reducer: {
        session: session
    }
})
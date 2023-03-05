import { combineReducers } from "@reduxjs/toolkit";

import addMenuSlice from "@/store/slices/addMenu-slice"
import userSlice from "@/store/slices/user-slice";
import loginSlice from "@/store/slices/loginSlice";
import signUpSlice from "@/store/slices/signUpSlice";
import modeSlice from "@/store/slices/modeSlice";
import postItDataSlice from "./slices/postItDataSlice";


const rootReducer = combineReducers({
        addMenu: addMenuSlice,
        user: userSlice,
        login: loginSlice,
        signUp: signUpSlice,
        mode: modeSlice,
        data: postItDataSlice
});

export type ReducerType = ReturnType<typeof rootReducer>;
export default rootReducer;
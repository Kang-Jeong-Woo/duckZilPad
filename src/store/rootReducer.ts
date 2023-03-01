import { combineReducers } from "@reduxjs/toolkit";

import loginSlice from "@/store/slices/loginSlice";
import signUpSlice from "@/store/slices/signUpSlice";
import modeSlice from "@/store/slices/modeSlice";

const rootReducer = combineReducers({

        login: loginSlice,
        signUp: signUpSlice,
        mode: modeSlice

});

export type ReducerType = ReturnType<typeof rootReducer>;
export default rootReducer;
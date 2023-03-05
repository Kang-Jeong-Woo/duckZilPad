import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface userState {
    userData: userDataState,
    isLogIn : boolean
}

export interface userDataState {
    _id?: string,
    userId?: string,
    nick?: string,
    roll?: number
}

const initialState: userState = {
    userData: {}, isLogIn:false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setUser(state, action: PayloadAction<object>){
            state.isLogIn = true;
            state.userData = action.payload;
        },
        userClear() {
            return initialState
        }
    }
})

export const userActions = userSlice.actions;
export default userSlice.reducer;
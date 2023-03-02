import { createSlice } from '@reduxjs/toolkit';

export interface modeState {
    loginMode: { 
        isLogin:boolean, 
        isSignUp:boolean 
    }
}

const initialState: modeState = {
    loginMode: { 
        isLogin: true, 
        isSignUp: false 
    }
}

export const modeSlice = createSlice({
    name: 'mode',
    initialState,
    reducers: {
            setLoginMode: (state)=>{
                state.loginMode = { isLogin: true, isSignUp: false }
            },
            setSignUpMode: (state)=>{
                state.loginMode = { isLogin: false, isSignUp: true }
            }
        }
})

export const { 
    setLoginMode, 
    setSignUpMode
} = modeSlice.actions;

export default modeSlice.reducer;
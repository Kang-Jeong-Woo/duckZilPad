import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface modeState {
    loginMode: { 
        isLogin:boolean, 
        isSignUp:boolean 
    }
    dragMode: {
        isMode: boolean,
        isDrag: boolean
    }
}

const initialState: modeState = {
    loginMode: { 
        isLogin: true, 
        isSignUp: false 
    },
    dragMode: {
        isMode: false,
        isDrag: false
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
            },
            setDragIsMode: (state)=>{
                if(state.dragMode.isMode) {
                    state.dragMode.isMode = false
                } else if(!state.dragMode.isMode) {
                    state.dragMode.isMode = true
                }          
            },
            setIsDrag: (state, action:PayloadAction<boolean>)=>{
                state.dragMode.isDrag = action.payload
            }
        }
})

export const { 
    setLoginMode, 
    setSignUpMode,
    setDragIsMode,
    setIsDrag
} = modeSlice.actions;

export default modeSlice.reducer;
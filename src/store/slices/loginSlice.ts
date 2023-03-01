import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface loginState {
    loginData: {
        userId?: string;
        password?: string;
    }
    message?: string;
}


const initialState: loginState = {
    loginData: {},
    message: ""
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setLoginData: (state, action: PayloadAction<{type: 'userId'|'password', value: string}>)=>{
            switch (action.payload.type) {
                case "userId" :
                    state.loginData.userId = action.payload.value;
                    break;
                case "password" :
                    state.loginData.password = action.payload.value;
                    break;
            }
        },
        setLoginMessage: (state, action: PayloadAction<string>)=>{
            state.message = action.payload
        }
    }
})

export const { 
    setLoginData, 
    setLoginMessage } = loginSlice.actions;

export default loginSlice.reducer;

//
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface signUpState {
    signUpData: {
        userId?: string;
        password?: string;
        passwordConfim?: string;
        nick?: string;
    };
    meassage: {
        userIdMessage?: string;
        passwordMessage?: string;
        nickMessage?: string;
    };
    validation: {
        isUserId?: boolean;
        isPassword?: boolean;
        isNick?: boolean; 
    }
}

const initialState: signUpState = {
    signUpData: {},
    meassage: {},
    validation: {}
}

export const signUpSlice = createSlice({
    name: 'signUp',
    initialState,
    reducers: {
        setSignUpData: (state, action: PayloadAction<{type: 
            'userId'|'password'|'passwordConfim'|'nick', value: string}>) => {
            switch (action.payload.type) {
                case "userId" :
                    state.signUpData.userId = action.payload.value;
                    break;
                case "password" :
                    state.signUpData.password = action.payload.value;
                    break;
                case "passwordConfim" :
                    state.signUpData.passwordConfim = action.payload.value;
                    break;
                case "nick" :
                    state.signUpData.nick = action.payload.value;
                    break;
            }
        },
        userIdCheck: (state, action: PayloadAction<string>) => {
            if(state.signUpData.userId === "" || state.signUpData.userId === undefined) {
                state.validation.isUserId = false
                state.meassage.userIdMessage = "Please enter user-id."
            } else if(state.signUpData.userId.length < 2 || state.signUpData.userId.length >= 10) {
                state.validation.isUserId = false
                state.meassage.userIdMessage = "Please enter at least 2 and no more than 10."
            } else if(state.signUpData.userId === action.payload) {
                state.validation.isUserId = false
                state.meassage.userIdMessage = "Duplicate user-id."
            } else if(action.payload === undefined || action.payload === null || action.payload === "") {
                state.validation.isUserId = true
                state.meassage.userIdMessage = "Not duplicate user-id."
            }
        },
        passwordCheck: (state) => {
            if(state.signUpData.password === "" || state.signUpData.password === undefined) {
                state.validation.isPassword = false
                state.meassage.passwordMessage = "Please enter password."
            } else if(state.signUpData.password.length < 5 || state.signUpData.password.length >= 20) {
                state.validation.isPassword = false
                state.meassage.passwordMessage = "Please enter at least 5 and no more than 20."
            } else if(state.signUpData.password !== state.signUpData.passwordConfim) {
                state.validation.isPassword = false
                state.meassage.passwordMessage = 'password does not match.'
            } else {
                state.validation.isPassword = true
                state.meassage.passwordMessage = 'password matches.'
            }
        },
        nickCheck: (state, action: PayloadAction<string>) => {
            if(state.signUpData.nick === "" || state.signUpData.nick === undefined) {
                state.validation.isNick = false
                state.meassage.nickMessage = "Please enter nick."
            } else if(state.signUpData.nick.length < 2 || state.signUpData.nick.length >= 10) {
                state.validation.isNick = false
                state.meassage.nickMessage = "Please enter at least 2 and no more than 10."
            } else if(state.signUpData.nick === action.payload) {
                state.validation.isNick = false
                state.meassage.nickMessage = "Duplicate nick."
            } else if(action.payload === undefined || action.payload === null || action.payload === "") {
                state.validation.isNick = true
                state.meassage.nickMessage = "Not duplicate nick."
            }
        }
    }
})

export const { 
    setSignUpData,
    userIdCheck,
    passwordCheck,
    nickCheck } = signUpSlice.actions;

export default signUpSlice.reducer;
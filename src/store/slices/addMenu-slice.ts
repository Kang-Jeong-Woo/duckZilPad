import {createSlice} from "@reduxjs/toolkit";


export interface addMenuState {
    modal: boolean,
    font: boolean,
    post: boolean,
    table: boolean
}

const initialState: addMenuState = {
    modal: false,
    font: false,
    post: false,
    table: false
};

const addMenuSlice = createSlice({
    name: "addMenu",
    initialState,
    reducers: {
        setFont(state) {
            state.modal = true
            state.font = true
            state.post = false
            state.table = false
        },
        setPost(state) {
            state.modal = true
            state.post = true
            state.font = false
            state.table = false
        },
        setTable(state) {
            state.modal = true
            state.table = true
            state.font = false
            state.post = false
        },
        close(state) {
            state.modal = false
            state.post = false
            state.font = false
            state.table = false
        },
    }
});

export const addMenuActions = addMenuSlice.actions;
export default addMenuSlice.reducer;
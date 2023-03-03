import {createSlice} from "@reduxjs/toolkit";


export interface addMenuState {
    modal: boolean,
    font: boolean,
    img: boolean,
    table: boolean
}

const initialState: addMenuState = {
    modal: false,
    font: false,
    img: false,
    table: false
};

const addMenuSlice = createSlice({
    name: "addMenu",
    initialState,
    reducers: {
        setFont(state) {
            state.modal = true
            state.font = true
            state.img = false
            state.table = false
        },
        setImg(state) {
            state.modal = true
            state.img = true
            state.font = false
            state.table = false
        },
        setTable(state) {
            state.modal = true
            state.table = true
            state.font = false
            state.img = false
        },
        close(state) {
            state.modal = false
            state.img = false
            state.font = false
            state.table = false
        },
    }
});

export const addMenuActions = addMenuSlice.actions;
export default addMenuSlice.reducer;
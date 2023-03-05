import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface canvasState {
    userId: string,
    isInit: boolean,
    drawingOn: boolean,
    color: string,
    radius: number,
    drawData: drawData,
}

export interface drawData {
    _id?:string
    userId: string,
    drawData?:string
}

const initialState: canvasState = {
    userId: "",
    isInit: true,
    drawingOn: true,
    color: "#ffffff",
    radius: 1,
    drawData: {userId:"", drawData:undefined},
};

const canvasSlice = createSlice({
    name: "canvas",
    initialState,
    reducers: {
        setColor(state, action:PayloadAction<string>) {
            state.color = action.payload
        },
        setRadius(state, action:PayloadAction<number>) {
            state.radius = action.payload
        },
        setIsDraw(state) {
            state.drawingOn=(!state.drawingOn)
        },
        setDrawData(state, action) {
            if (state.isInit) {
                state.drawData.userId = action.payload.userId;
                state.drawData.drawData = action.payload.saveImage;
                state.isInit = false;
            }
            return
        },
        canvasClear() {
            return initialState
        }
    }
});

export const canvasActions = canvasSlice.actions;
export default canvasSlice.reducer;
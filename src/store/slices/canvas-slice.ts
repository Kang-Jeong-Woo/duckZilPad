import {createSlice} from "@reduxjs/toolkit";

export interface canvasState {
    isInit: boolean,
    drawingOn: boolean,
    color: string,
    radius: number,
    drawData: {userId:string, drawData?:string},
}

const initialState: canvasState = {
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
        setColor(state, action) {
            state.color = action.payload
        },
        setRadius(state, action) {
            state.radius = action.payload

        },
        setIsDraw(state) {
            state.drawingOn=(!state.drawingOn)
        },
        setDrawData(state, action) {
            if (state.isInit) {
                state.drawData = action.payload;
                state.isInit = false;
            }
            return
        },
        setSliceData(state, action){
            state.drawData.userId = "userid";
            state.drawData.drawData = action.payload;
        },
        canvasClear() {
            return initialState
        }
    }
});

export const canvasActions = canvasSlice.actions;
export default canvasSlice.reducer;
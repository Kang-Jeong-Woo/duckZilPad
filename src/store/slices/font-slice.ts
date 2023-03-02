import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface fontState {
    isInit: boolean,
    fontData: fontDataState[]
}

export interface fontDataState {
    id?: string,
    _id?: string,
    userId: string,
    content: string,
    pinned: boolean,
    isDelete: boolean,
    style: string,
    degree: number,
    color: string,
    width: number,
    height: number,
    positionX: number,
    positionY: number,
    positionZ: number
}

const initialState: fontState = {isInit:true, fontData:[]};

const fontSlice = createSlice({
    name: "font",
    initialState,
    reducers:{
        setFont(state, action:PayloadAction<fontDataState[]>) {
            if (state.isInit) {
                action.payload.map((fontData) => {
                    fontData.id = fontData._id
                    state.fontData.push(fontData)
                });
                state.isInit = false;
            }
            return
        },
        addFont(state, action:PayloadAction<{userId: string, style: string, content: string, color: string}>){
            const newFontData = {
                id: String(Math.random()),
                userId: action.payload.userId,
                content: action.payload.content,
                pinned: false,
                isDelete: false,
                style: action.payload.style,
                degree: 0,
                color:action.payload.color,
                width: 300,
                height: 200,
                positionX: 0,
                positionY: 0,
                positionZ: 10
            }
            state.fontData.push(newFontData);
        },
        deleteFont(state, action:PayloadAction<string>) {
            const editAry = state.fontData.find((font) => font.id === action.payload)
            if(editAry !== undefined) {
                editAry.isDelete = true
            }
        },
        updateZIndex(state, action:PayloadAction<{id: string, z: number, colName: "fontData"}>){
            const newData = action.payload;
            const editAry = state.fontData.find((font) => font.id === newData.id);
            if(editAry !== undefined) {
                editAry.positionZ=newData.z
            }  
        },
        updateXYPosition(state, action:PayloadAction<{id: string, x: number, y: number, colName: "fontData"}>){
            const newData = action.payload;
            const editAry = state.fontData.find((font) => font.id === newData.id);
            if(editAry !== undefined) {
                editAry.positionX=newData.x
                editAry.positionY=newData.y
            }  
        },
        updateWHPosition(state, action:PayloadAction<{id: string, x: number, y: number, h: number, w: number, colName: "fontData"}>){
            const newData = action.payload;
            const editAry = state.fontData.find((font) => font.id === newData.id);
            if(editAry !== undefined) {
                editAry.positionX=newData.x
                editAry.positionY=newData.y
                editAry.width=newData.w
                editAry.height=newData.h
            }  
        },
        updateDegree(state, action:PayloadAction<{id: string, degree: number, colName: "fontData"}>) {
            const newData = action.payload;
            const editAry = state.fontData.find((font) => font.id === newData.id);
            if(editAry !== undefined) {
                editAry.degree = newData.degree
            } 
        },
        fontClear() {
            return initialState
        }
    }
})

export const fontActions = fontSlice.actions;
export default fontSlice.reducer;
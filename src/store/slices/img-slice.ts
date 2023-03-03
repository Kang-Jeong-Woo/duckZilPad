import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface ImgState {
    isInit: boolean,
    ImgData: ImgDataState[]
}

export interface ImgDataState {
    _id: string,
    userId: string,
    content: string,
    title: string,
    pinned: boolean,
    isDelete: boolean,
    style: string,
    width: number,
    height: number,
    positionX: number,
    positionY: number,
    positionZ: number
}

const initialState: ImgState = {isInit: true, ImgData: []}

const ImgSlice = createSlice({
    name: "postIt",
    initialState,
    reducers: {
        setImg(state, action:PayloadAction<ImgDataState[]>) {
            if (state.isInit) {
                action.payload.map(postItData => {
                    state.ImgData.push(postItData)
                });
                state.isInit = false;
            }
            return
        },
        addImg(state, action:PayloadAction<{userId: string, title: string, content: string}>) {

            const postItDefaultData = {
                _id: String(Math.random()),
                positionX: 0,
                positionY: 0,
                positionZ: 10,
                width: 200,
                height: 220,
                userId: action.payload.userId,
                style: "",
                pinned: false,
                isDelete: false,
                title:action.payload.title,
                content: action.payload.content
            }
            state.ImgData.push(postItDefaultData);

        },
        deleteImg(state, action:PayloadAction<string>) {
            const editAry = state.ImgData.find((postIt) => postIt._id === action.payload);
            if(editAry !== undefined) {
                editAry.isDelete = true
            }
        },
        updateZIndex(state, action:PayloadAction<{id: string, z: number, colName: string}>){
            const newData = action.payload;
            const editAry = state.ImgData.find((postIt) => postIt._id === newData.id);
            if(editAry !== undefined) {
                editAry.positionZ=newData.z
            }  
        },
        updateXYPosition(state, action:PayloadAction<{id: string, x: number, y: number, colName: string}>){
            const newData = action.payload;
            const editAry = state.ImgData.find((postIt) => postIt._id === newData.id);
            if(editAry !== undefined) {
                editAry.positionX=newData.x
                editAry.positionY=newData.y
            }  
        },
        updateWHPosition(state, action:PayloadAction<{id: string, x: number, y: number, h: number, w: number, colName: string}>){
            const newData = action.payload;
            const editAry = state.ImgData.find((postIt) => postIt._id === newData.id);
            if(editAry !== undefined) {
                editAry.positionX=newData.x
                editAry.positionY=newData.y
                editAry.width=newData.w
                editAry.height=newData.h
            }  
        },
        ImgClear() {
            return initialState
        }
    }
});

export const ImgActions = ImgSlice.actions;
export default ImgSlice.reducer;
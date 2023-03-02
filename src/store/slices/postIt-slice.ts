import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface postItState {
    isInit: boolean,
    postItData: postItDataState[]
}

export interface postItDataState {
    id?: string,
    _id?: string,
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

const initialState: postItState = {isInit: true, postItData: []}

const postItSlice = createSlice({
    name: "postIt",
    initialState,
    reducers: {
        setPostIt(state, action:PayloadAction<postItDataState[]>) {
            if (state.isInit) {
                action.payload.map(postItData => {
                    postItData.id = postItData._id
                    state.postItData.push(postItData)
                });
                state.isInit = false;
            }
            return
        },
        addPostIt(state, action:PayloadAction<{userId: string, title: string, content: string}>) {

            const postItDefaultData = {
                id: String(Math.random()),
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
            state.postItData.push(postItDefaultData);

        },
        deletePostIt(state, action:PayloadAction<string>) {
            const editAry = state.postItData.find((postIt) => postIt.id === action.payload);
            if(editAry !== undefined) {
                editAry.isDelete = true
            }
        },
        updateZIndex(state, action:PayloadAction<{id: string, z: number, colName: "postItsData"}>){
            const newData = action.payload;
            const editAry = state.postItData.find((postIt) => postIt.id === newData.id);
            if(editAry !== undefined) {
                editAry.positionZ=newData.z
            }  
        },
        updateXYPosition(state, action:PayloadAction<{id: string, x: number, y: number, colName: "postItsData"}>){
            const newData = action.payload;
            const editAry = state.postItData.find((postIt) => postIt.id === newData.id);
            if(editAry !== undefined) {
                editAry.positionX=newData.x
                editAry.positionY=newData.y
            }  
        },
        updateWHPosition(state, action:PayloadAction<{id: string, x: number, y: number, h: number, w: number, colName: "postItsData"}>){
            const newData = action.payload;
            const editAry = state.postItData.find((postIt) => postIt.id === newData.id);
            if(editAry !== undefined) {
                editAry.positionX=newData.x
                editAry.positionY=newData.y
                editAry.width=newData.w
                editAry.height=newData.h
            }  
        },
        postItClear() {
            return initialState
        }
    }
});

export const postItActions = postItSlice.actions;
export default postItSlice.reducer;
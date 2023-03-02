import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface tableState {
    isInit: boolean,
    tableData: tableDataState[]
}

export interface tableDataState {
    id?: string,
    _id?: string,
    userId: string,
    contents: {titles: string[], contents: string[][]},
    pinned: boolean,
    isDelete: boolean,
    style: {font?: string},
    color: {font?: string, border?: string, back?: string},
    width: number,
    height: number,
    positionX: number,
    positionY: number,
    positionZ: number
}

const initialState: tableState = {isInit: true, tableData: []}

const tableSlice = createSlice({
    name: "table",
    initialState,
    reducers: {
        setTable(state, action:PayloadAction<tableDataState[]>) {
            if (state.isInit) {
                action.payload.map((tableData) => {
                    tableData.id = tableData._id
                    state.tableData.push(tableData)
                });
                state.isInit = false;
            }
            return
        },
        addTable(state, action:
            PayloadAction<{
                userId: string, 
                style: {font: string}, 
                color: {font: string, border: string, back: string},
                contents: {titles: string[], contents: string[][]}
            }>
        ) {
            const tableDefaultData = {
                id: String(Math.random()),
                positionX: 0,
                positionY: 0,
                positionZ: 10,
                width: 200,
                height: 220,
                userId: action.payload.userId,
                style: {
                    font: action.payload.style.font
                },
                color: {
                    font: action.payload.color.font,
                    border: action.payload.color.border,
                    back: action.payload.color.back
                },
                pinned: false,
                isDelete: false,
                contents: {titles: ["타이틀1", "타이틀2"], contents: [['내용1', '내용2'], ['내용3', '내용4']]}
            }
            state.tableData.push(tableDefaultData);
        },
        deleteTable(state, action:PayloadAction<string>) {
            const editAry = state.tableData.find((table) => table.id === action.payload);
            if(editAry !== undefined) {
                editAry.isDelete = true;
            } 
        },
        addColumn(state, action:PayloadAction<string>) {
            const editAry = state.tableData.find((table) => table.id === action.payload);
            if(editAry !== undefined) {
                editAry.contents.titles.push("타이틀")
                for(let i =0; i<editAry.contents.contents.length;i++){
                    editAry.contents.contents[i].push("내용")
                }
            } 
        },
        deleteColumn(state, action:PayloadAction<string>) {
            const editAry = state.tableData.find((table) => table.id === action.payload);
            if(editAry !== undefined) {
                editAry.contents.titles.pop()
                for(let i =0; i<editAry.contents.contents.length;i++){
                    editAry.contents.contents[i].pop()
                }
            } 
        },
        addRow(state, action:PayloadAction<string>) {
            const editAry = state.tableData.find((table) => table.id === action.payload);
            if(editAry !== undefined) {
                editAry.contents.contents.push(Array(editAry.contents.titles.length).fill("내용"))
            } 
        },
        deleteRow(state, action:PayloadAction<string>) {
            const editAry = state.tableData.find((table) => table.id === action.payload);
            if(editAry !== undefined) {
                editAry.contents.contents.pop()
            } 
        },
        updateTable(state, action:
            PayloadAction<{
                id: string, 
                column: number, 
                type: "title"|"content", 
                i: number, 
                value: string}>
        ) {
            const newData = action.payload;
            const editAry = state.tableData.find((table) => table.id === newData.id);
            if (action.payload.type === 'title' && editAry !== undefined) {
                editAry.contents.titles[newData.i] = newData.value
            } else if (action.payload.type === 'content' && editAry !== undefined){
                editAry.contents.contents[newData.column][newData.i] = newData.value
            }
        },
        updateZIndex(state, action:PayloadAction<{id: string, z: number, colName: "tableData"}>){
            const newData = action.payload;
            const editAry = state.tableData.find((table) => table.id === newData.id);
            if(editAry !== undefined) {
                editAry.positionZ=newData.z
            }      
        },
        updateXYPosition(state, action:PayloadAction<{id: string, x: number, y: number, colName: "tableData"}>){
            const newData = action.payload;
            const editAry = state.tableData.find((table) => table.id === newData.id);
            if(editAry !== undefined) {
                editAry.positionX=newData.x
                editAry.positionY=newData.y
            }  
        },
        updateWHPosition(state, action:PayloadAction<{id: string, x: number, y: number, h: number, w: number, colName: "tableData"}>){
            const newData = action.payload;
            const editAry = state.tableData.find((table) => table.id === newData.id);
            if(editAry !== undefined) {
                editAry.positionX=newData.x
                editAry.positionY=newData.y
                editAry.width=newData.w
                editAry.height=newData.h
            }  
        },
        tableClear() {
            return initialState
        }
    }
});

export const tableActions = tableSlice.actions;
export default tableSlice.reducer;
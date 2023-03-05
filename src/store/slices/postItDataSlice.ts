import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { 
    fontDataState, 
    imgDataState, 
    tableDataState, 
    canvasDataState, 
    drawDataState } from "@/types/postItDataType";

interface dataState {
    isInit: boolean,
    fontData: fontDataState[],
    imgData: imgDataState[],
    tableData: tableDataState[],
    canvasData: canvasDataState
}

const defaultFontData: fontDataState = {
    _id: String(Math.random()),
    userId: "",
    content: "",
    pinned: false,
    isDelete: false,
    style: "",
    color: "",
    degree: 0,
    width: 150,
    height: 150,
    positionX: 0,
    positionY: 0,
    positionZ: 10
}

const defaultImgData: imgDataState = {
    _id: String(Math.random()),
    userId: "",
    style: "",
    pinned: false,
    isDelete: false,
    title: "",
    content: "",
    tempUrl: "",
    width: 200,
    height: 220,
    positionX: 0,
    positionY: 0,
    positionZ: 10
}

const defaultTableData: tableDataState = {
    _id: String(Math.random()),
    userId: "",
    style: {
        font: ""
    },
    color: {
        font: "",
        border: "",
        back: ""
    },
    pinned: false,
    isDelete: false,
    contents: {
        titles: ["타이틀1", "타이틀2"], 
        contents: [['내용1', '내용2'], ['내용3', '내용4']]
    },
    width: 200,
    height: 220,
    positionX: 0,
    positionY: 0,
    positionZ: 10,
}

const defaultCanvasData: canvasDataState = {
    drawingOn: true,
    color: "#ffffff",
    radius: 1,
    drawData: {userId: "", coordinate: undefined},
}


const initialState: dataState = {
    isInit: true, 
    fontData: [], 
    imgData: [], 
    tableData: [], 
    canvasData: defaultCanvasData
}

const postItDataSlice = createSlice({
    name: "data",
    initialState,
    reducers:{
        setData(state, action:PayloadAction<{
            fontData: fontDataState[]|[],
            imgData: imgDataState[]|[],
            tableData: tableDataState[]|[],
            drawData: drawDataState|undefined
        }>) {
            if (state.isInit) {
                if(action.payload.fontData.length) {
                    action.payload.fontData.map((fontData) => {
                        state.fontData.push(fontData)
                    });
                }
                if(action.payload.imgData.length) {
                    action.payload.imgData.map((imgData) => {
                        state.imgData.push(imgData)
                    });
                }
                if(action.payload.tableData.length) {
                    action.payload.tableData.map((tableData) => {
                        state.tableData.push(tableData)
                    });
                }
                if(action.payload.drawData) {
                    state.canvasData.drawData.userId = action.payload.drawData.userId;
                    state.canvasData.drawData.coordinate = action.payload.drawData.coordinate;
                }
                state.isInit = false;
            }
            return
        },
        addData(state, action:PayloadAction<{
            userId: string,
            colName: "font"|"img"|"table",
            font?: {content: string, style: string, color: string},
            img?: {title: string, content: string, tempUrl: string},
            table?: {style: {font: string}, color: {font: string, border: string, back: string}}
        }>){
            switch(action.payload.colName) {
                case 'font' :
                    if(action.payload.font) {
                        const newFontData = defaultFontData;
                        newFontData.userId = action.payload.userId;
                        newFontData.content = action.payload.font.content;
                        newFontData.style = action.payload.font.style;
                        newFontData.color = action.payload.font.color;
                        state.fontData.push(newFontData);
                    }
                    break;
                case 'img' :
                    if(action.payload.img) {
                        const newImgData = defaultImgData;
                        newImgData.userId = action.payload.userId;
                        newImgData.title = action.payload.img.title;
                        newImgData.content = action.payload.img.content;
                        newImgData.tempUrl = action.payload.img.tempUrl;
                        state.imgData.push(newImgData);
                    }
                    break;
                case 'table' :
                    if(action.payload.table) {
                        const newTableData = defaultTableData;
                        newTableData.userId = action.payload.userId;
                        newTableData.style.font = action.payload.table.style.font;
                        newTableData.color.font = action.payload.table.color.font;
                        newTableData.color.border = action.payload.table.color.border;
                        newTableData.color.back = action.payload.table.color.back;
                        state.tableData.push(newTableData);
                    }
                    break;
            }
        },
        deleteData(state, action:PayloadAction<{
            colName: "font"|"img"|"table",
            id: string
        }>) {
            switch(action.payload.colName) {
                case 'font' :
                    const deleteFont = state.fontData.find((font) => font._id === action.payload.id)
                    if(deleteFont !== undefined) {
                        deleteFont.isDelete = true
                    }
                    break;
                case 'img' :
                    const deleteImg = state.imgData.find((img) => img._id === action.payload.id)
                    if(deleteImg !== undefined) {
                        deleteImg.isDelete = true
                    }
                    break;
                case 'table' :
                    const deleteTable = state.tableData.find((table) => table._id === action.payload.id)
                    if(deleteTable !== undefined) {
                        deleteTable.isDelete = true
                    }
                    break;
            }       
        },
        updateZIndex(state, action:PayloadAction<{
            colName: "font"|"img"|"table",
            id: string, 
            z: number, 
        }>) {
            switch(action.payload.colName) {
                case 'font' :
                    const newFontData = action.payload;
                    const editFontData = state.fontData.find((font) => font._id === newFontData.id);
                    if(editFontData !== undefined) {
                        editFontData.positionZ = newFontData.z
                    }
                    break;
                case 'img' :
                    const newImgData = action.payload;
                    const editImgData = state.imgData.find((img) => img._id === newImgData.id);
                    if(editImgData !== undefined) {
                        editImgData.positionZ = newImgData.z
                    }
                    break;
                case 'table' :
                    const newTableData = action.payload;
                    const editTableData = state.tableData.find((table) => table._id === newTableData.id);
                    if(editTableData !== undefined) {
                        editTableData.positionZ = newTableData.z
                    }
                    break;
            }       
        },
        updateXYPosition(state, action:PayloadAction<{
            colName: "font"|"img"|"table",
            id: string,
            x: number, y: number
        }>){
            switch(action.payload.colName) {
                case 'font' :
                    const newFontData = action.payload;
                    const editFontData = state.fontData.find((font) => font._id === newFontData.id);
                    if(editFontData !== undefined) {
                        editFontData.positionX = newFontData.x
                        editFontData.positionY = newFontData.y
                    }
                    break;
                case 'img' :
                    const newImgData = action.payload;
                    const editImgData = state.imgData.find((img) => img._id === newImgData.id);
                    if(editImgData !== undefined) {
                        editImgData.positionX = newImgData.x
                        editImgData.positionY = newImgData.y
                    }
                    break;
                case 'table' :
                    const newTableData = action.payload;
                    const editTableData = state.tableData.find((table) => table._id === newTableData.id);
                    if(editTableData !== undefined) {
                        editTableData.positionX = newTableData.x
                        editTableData.positionY = newTableData.y
                    }
                    break;
            } 
        },
        updateWHPosition(state, action:PayloadAction<{
            colName: "font"|"img"|"table",
            id: string,
            x: number, y: number, 
            h: number, w: number
        }>){
            switch(action.payload.colName) {
                case 'font' :
                    const newFontData = action.payload;
                    const editFontData = state.fontData.find((font) => font._id === newFontData.id);
                    if(editFontData !== undefined) {
                        editFontData.positionX = newFontData.x
                        editFontData.positionY = newFontData.y
                        editFontData.width = newFontData.w
                        editFontData.height = newFontData.h
                    }  
                    break;
                case 'img' :
                    const newImgData = action.payload;
                    const editImgData = state.imgData.find((img) => img._id === newImgData.id);
                    if(editImgData !== undefined) {
                        editImgData.positionX = newImgData.x
                        editImgData.positionY = newImgData.y
                        editImgData.width = newImgData.w
                        editImgData.height = newImgData.h
                    }  
                    break;
                case 'table' :
                    const newTableData = action.payload;
                    const editTableData = state.tableData.find((table) => table._id === newTableData.id);
                    if(editTableData !== undefined) {
                        editTableData.positionX = newTableData.x
                        editTableData.positionY =newTableData.y
                        editTableData.width = newTableData.w
                        editTableData.height = newTableData.h
                    }  
                    break;
            } 
        },
        updateFontDegree(state, action:PayloadAction<{
            colName: "font",
            id: string,
            degree: number
        }>) {
            const newData = action.payload;
            const editAry = state.fontData.find((font) => font._id === newData.id);
            if(editAry !== undefined) {
                editAry.degree = newData.degree
            } 
        },
        addTableColumn(state, action:PayloadAction<{
            colName: "table",
            id: string
        }>) {
            const editAry = state.tableData.find((table) => table._id === action.payload.id);
            if(editAry !== undefined) {
                editAry.contents.titles.push("타이틀")
                for(let i =0; i<editAry.contents.contents.length;i++){
                    editAry.contents.contents[i].push("내용")
                }
            }
        },
        deleteTableColumn(state, action:PayloadAction<{
            colName: "table",
            id: string
        }>) {
            const editAry = state.tableData.find((table) => table._id === action.payload.id);
            if(editAry !== undefined) {
                editAry.contents.titles.pop()
                for(let i =0; i<editAry.contents.contents.length;i++){
                    editAry.contents.contents[i].pop()
                }
            }
        },
        addTableRow(state, action:PayloadAction<{
            colName: "table",
            id: string
        }>) {
            const editAry = state.tableData.find((table) => table._id === action.payload.id);
            if(editAry !== undefined) {
                editAry.contents.contents.push(Array(editAry.contents.titles.length).fill("내용"))
            }
        },
        deleteTableRow(state, action:PayloadAction<{
            colName: "table",
            id: string
        }>) {
            const editAry = state.tableData.find((table) => table._id === action.payload.id);
            if(editAry !== undefined) {
                editAry.contents.contents.pop()
            }
        },
        updateTableTitle(state, action:PayloadAction<{
            colName: "table",
            id: string,
            type: "title",
            i: number,
            value: string
        }>){
            const newData = action.payload;
            const editAry = state.tableData.find((table) => table._id === newData.id);
            if (editAry !== undefined) {
                editAry.contents.titles[newData.i] = newData.value
            }
        },
        updateTableContent(state, action:PayloadAction<{
            colName: "table",
            id:string,
            column:number,
            type:"content",
            i:number,
            value:string
        }>){
            const newData = action.payload;
            const editAry = state.tableData.find((table) => table._id === newData.id);
            if(editAry !== undefined){
                editAry.contents.contents[newData.column][newData.i] = newData.value
            }
        },
        setCanvasColor(state, action:PayloadAction<{
            colName: "canvas",
            color: string
        }>) {
            state.canvasData.color = action.payload.color
        },
        setCanvasRadius(state, action:PayloadAction<{
            colName: "canvas",
            radius: number
        }>) {
            state.canvasData.radius = action.payload.radius
        },
        setCanvasIsDraw(state, action:PayloadAction<{
            colName: "canvas"
        }>) {
            state.canvasData.drawingOn=(!state.canvasData.drawingOn)
        }
    }
})

export const postItDataActions = postItDataSlice.actions;
export default postItDataSlice.reducer;
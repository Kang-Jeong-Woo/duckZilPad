export interface fontDataState {
    _id: string,
    userId: string,
    content: string,
    pinned: boolean,
    isDelete: boolean,
    style: string,
    color: string,
    degree: number,
    width: number,
    height: number,
    positionX: number,
    positionY: number,
    positionZ: number,
}

export interface imgDataState {
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
    positionZ: number,
    tempUrl?:string
}

export interface tableDataState {
    _id: string,
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
    positionZ: number,
}

export interface canvasDataState {
    drawingOn: boolean,
    color: string,
    radius: number,
    drawData: drawDataState
}

export interface drawDataState {
    _id?:string
    userId: string,
    coordinate?:string
}
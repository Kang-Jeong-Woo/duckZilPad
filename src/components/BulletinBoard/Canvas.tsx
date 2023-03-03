import {useAppDispatch, useAppSelector} from "@/store/hooks";
import React, {useEffect, useRef, useState} from "react";
import {RootState} from "@/store/store";
import {canvasActions} from "@/store/slices/canvas-slice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowRotateBackward,
    faEraser,
    faFloppyDisk,
    faPaintbrush,
    faPalette,
    faPen
} from "@fortawesome/free-solid-svg-icons";
import CanvasDraw from "react-canvas-draw";
import styled, {keyframes} from "styled-components";
import axios from "axios";
import { getCookie } from "@/lib/cookie";
import { tableActions } from "@/store/slices/table-slice";
import { fontActions } from "@/store/slices/font-slice";
import { imgActions } from "@/store/slices/img-slice";

const Canvas = () => {
    const dispatch = useAppDispatch();
    const penRef = useRef<HTMLDivElement>(null);
    const saveRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<CanvasDraw>(null);
    const [canvasWidth, setCanvasWidth] = useState(1920);
    const [canvasHeight, setCanvasHeight] = useState(937);
    const canvasData = useAppSelector((state:RootState) => state.canvas);
    const imgData = useAppSelector((state:RootState)=>state.img.imgData);
    const fontData = useAppSelector((state:RootState)=>state.font.fontData);
    const tableData = useAppSelector((state:RootState)=>state.table.tableData);
    const userId = useAppSelector((state:RootState) => state.user.userData.userId);
 
    const setHeight = () => Math.ceil(window.innerHeight - 70);
    const setWidth = () => Math.ceil(window.innerWidth);
    const drawClear = () => {
        canvasRef.current?.clear()};
    const undo = () => {
        canvasRef.current?.undo()};
    const changeColor = (event:React.ChangeEvent<HTMLInputElement>) => {
        dispatch(canvasActions.setColor(event.target.value));
    };
    const changeRadius = (event:React.ChangeEvent<HTMLInputElement>) => {
        dispatch(canvasActions.setRadius(+event.target.value));
    };
    const onOffDraw = () => {
        dispatch(canvasActions.setIsDraw());
    };
    const onSaveDB = () => {
        const drawData = {userId:userId, drawData:canvasRef.current?.getSaveData()}
        try {
            axios.post(
              "/api/savedata",
              { accessToken: getCookie("accessToken"), 
                tableData: tableData, imgData: imgData, fontData: fontData, drawData: drawData})
            .then((result) => {
              if (result.status === 200) {
                  console.log(result.data)
                  dispatch(tableActions.tableClear());
                  dispatch(fontActions.fontClear());
                  dispatch(imgActions.imgClear());
                  dispatch(canvasActions.canvasClear());
                  axios.post(
                    "/api/savedata/success",
                    { accessToken: getCookie("accessToken") })
                  .then((result)=>{
                    dispatch(tableActions.setTable(result.data.tableData));
                    dispatch(fontActions.setFont(result.data.fontData));
                    dispatch(imgActions.setImg(result.data.imgData));
                    dispatch(canvasActions.setDrawData(result.data.drawData));
                  })
                  .catch((error)=>{
                    console.log(error)
                  })
              }
            })
        } catch (error) {
            alert("ask 4 manager")
        }
    };
    const menuMouseEnter = () => {
        penRef.current!.style.top = "60px"
        penRef.current!.style.opacity = "1"
    };
    const menuMouseLeave = () => {
        penRef.current!.style.top = "-200px"
        penRef.current!.style.opacity = "0"
    };
    const saveMouseEnter = () => {
        saveRef.current!.style.left = "60px"
        saveRef.current!.style.opacity = "1"
    };
    const saveMouseLeave = () => {
        saveRef.current!.style.left = "-200px"
        saveRef.current!.style.opacity = "0"
    };
    useEffect(()=>{
        setCanvasWidth(setWidth());
        setCanvasHeight(setHeight());
    },[]);
    // @ts-ignore
    return(
        <>
            <div >
                <IconWrapper onMouseEnter={menuMouseEnter} onMouseLeave={menuMouseLeave}>
                    <FontAwesomeIcon icon={faPaintbrush}/>
                    <PenMenuWrapper ref={penRef}>
                        <div>
                            <FontIcon><FontAwesomeIcon icon={faPen}/></FontIcon>
                            <ToggleSwitch htmlFor={"onOff"} id={"onnOff"}>
                                <input hidden={true} type="checkbox" id={"onOff"} onChange={onOffDraw}/>
                                <ToggleBtn></ToggleBtn>
                            </ToggleSwitch>
                        </div>
                        <div>
                            <label htmlFor={"color"} id={"color"}>
                                <FontIcon><FontAwesomeIcon icon={faPalette}/></FontIcon>
                                <input type={"color"} id={"color"} name={"color"} value={canvasData.color}
                                       onChange={changeColor}/>
                            </label>
                        </div>
                        <div>
                            <label htmlFor={"radius"} id={"radius"}>
                                <FontIcon><FontAwesomeIcon icon={faPaintbrush}/></FontIcon>
                                <input type="range" id={"radius"} name={"radius"} min={1} max={20} step={0.5}
                                       value={canvasData.radius} onChange={changeRadius}/>
                            </label>
                        </div>
                        <div>
                            <BtnIcon onClick={drawClear}><FontIcon><FontAwesomeIcon icon={faEraser}/></FontIcon></BtnIcon>
                            <BtnIcon onClick={undo}><FontIcon><FontAwesomeIcon icon={faArrowRotateBackward}/></FontIcon></BtnIcon>
                        </div>
                    </PenMenuWrapper>
                </IconWrapper>

                <SaveWrapper onClick={onSaveDB} onMouseEnter={saveMouseEnter}
                     onMouseLeave={saveMouseLeave}>
                    <FontAwesomeIcon icon={faFloppyDisk} id={"save"}/>
                    <label htmlFor={"save"}></label>
                    <SaveIcon ref={saveRef}>Save</SaveIcon>
                </SaveWrapper>

            </div>
            <CanvasDraw
                ref={canvasRef}
                saveData={canvasData.drawData.drawData}
                canvasWidth={canvasWidth}
                canvasHeight={canvasHeight}
                style={{backgroundColor: "#F2F2F2"}}
                hideGrid={true}
                disabled={canvasData.drawingOn}
                lazyRadius={0}
                brushRadius={+canvasData.radius}
                brushColor={canvasData.color}
                catenaryColor={"#0a0302"}
                immediateLoading={true}
            />
        </>
    )
}
export default Canvas;
const hovering = keyframes`
  0% {
    -webkit-transform: translate(0);
    transform: translate(0);
  }
  20% {
    -webkit-transform: translate(-2px, 2px);
    transform: translate(-2px, 2px);
  }
  40% {
    -webkit-transform: translate(-2px, -2px);
    transform: translate(-2px, -2px);
  }
  60% {
    -webkit-transform: translate(2px, 2px);
    transform: translate(2px, 2px);
  }
  80% {
    -webkit-transform: translate(2px, -2px);
    transform: translate(2px, -2px);
  }
  100% {
    -webkit-transform: translate(0);
    transform: translate(0);
  }
`;
const BtnIcon = styled.button`
  border: 0;
  outline: 0;
  background: none;
  cursor: pointer;
  font-size: larger;
`;
const IconWrapper = styled.div`
  list-style: none;
  cursor: pointer;
  width: 33px;
  height: 33px;
  border-radius: 3rem;
  position: absolute;
  top: 73px;
  left: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  padding: 0 20px;
  background-color: #EBE51E;
  color: #111;
  border: 2px solid #111;
  box-shadow: 4px 4px black;
  z-index: 10000;
  transition: 0.6s;
  &input{
    cursor: pointer;
  }
  &:hover{
    outline: 0;
    box-shadow:0px 0px black;
  }
`;
const PenMenuWrapper = styled.div`
  position: absolute;
  top: 1px;
  left: -200px;
  transition: 0.5s;
  width: 200px;
  &div{
    padding: 0.25em 0;
    animation: ${hovering} 3s linear infinite both;
  }
`;
const ToggleBtn = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
  &:before{
    position: absolute;
    content: "";
    height: 10px;
    width: 10px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
`;
const ToggleSwitch = styled.label`
  position: absolute;
  top: 5px;
  display: inline-block;
  width: 50px;
  height: 18px;
  &input{
    &:checked + ${ToggleBtn}{
      background-color: #EBE51E;
    }
    &:focus + ${ToggleBtn}{
      box-shadow: 0 0 1px #EBE51E;
    }
    &:checked + ${ToggleBtn}:before{
      transform: translateX(30px);
    }
  }
`;
const FontIcon = styled.span`
  color: black;
  margin-right: 0.5em;
`;
const SaveWrapper = styled.div`
  list-style: none;
  cursor: pointer;
  width: 33px;
  height: 33px;
  border-radius: 3rem;
  position: absolute;
  top: 118px;
  left: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  padding: 0 20px;
  background-color: #EBE51E;
  color: #111;
  border: 2px solid #111;
  box-shadow: 4px 4px black;
  z-index: 10000;
  transition: 0.6s;
  &:active{
    background-color: #D6D01F;
  }
  &:hover{
    outline: 0;
    box-shadow:0px 0px black;
  }
`;
const SaveIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: fantasy;
  position: absolute;
  left: -200px;
  transition: 0.5s;
  width: 70px;
  border-radius: 8px;
  height: 30px;
  background: #EBE51E;
  box-shadow: 2px 2px black;
  color: black;
  cursor: pointer;
  &:after{
    content: '';
    position: absolute;
    left: 1px;
    top: 50%;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-right-color: #EBE51E;
    border-left: 0;
    margin-top: -10px;
    margin-left: -10px;
  }
`;
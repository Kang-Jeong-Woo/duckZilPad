import React, {useEffect, useRef, useState, WheelEvent} from "react";
import {useAppDispatch} from "@/store/hooks";
import {DraggableData, Rnd, RndDragCallback, RndResizeCallback} from "react-rnd";
import {DraggableEvent} from "react-draggable";
import {fontActions} from "@/store/slices/font-slice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark, faThumbtack} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const FontPostIt: React.FC<{
    id: string,
    content: string,
    pinned: boolean,
    style: string,
    degree: number
    color: string
    width: number
    height: number
    positionX: number
    positionY: number
    positionZ: number
    onDragPst: () => void
    onSizePst: () => void
    onZpst: () => void
}> = props => {
    const dispatch = useAppDispatch();
    const borderRef = useRef<HTMLDivElement>(null);
    const tabRef = useRef<HTMLSpanElement>(null);
    const [degree, setDegree] = useState(props.degree);
    const [draggable, setDraggable] = useState<boolean>(false);
    const [diagramWidth, setDiagramWidth] = useState<string>("0");
    const [diagramHeight, setDiagramHeight] = useState<string>("0");
    const [picWidth, setPicWidth] = useState<number>(0);
    const [picHeight, setPicHeight] = useState<number>(0);
    const [isFirstLoad, setFirstLoad] = useState<boolean>(true);
    const setZIndex = (cur:number, next:number) => {
        return next > cur ? next : cur;
    }
    const pinEvent = () => {setDraggable(!draggable)};
    const closeEvent = () => {dispatch(fontActions.deleteFont(props.id))};
    const mouseIn = () => {tabRef.current!.style.top = "0px"};
    const mouseOut = () => {tabRef.current!.style.top = "-23px"};
    const wheelEvent = (event:WheelEvent) => {
        if(event.deltaY<0){
            setDegree(degree - 10);
        } else {
            setDegree(degree + 10);
        }
    }
    useEffect(()=>{
        const setDegree = setTimeout((id=props.id)=>{
            const degreeData = {id:id, degree:degree, colName:"fontData"}
            dispatch(fontActions.updateDegree(degreeData));
        },1000);
        return () => {
            clearTimeout(setDegree);
        }
    },[wheelEvent])
    const dragStart:RndDragCallback = (e:DraggableEvent, d:DraggableData, id = props.id) => {
        const setIndex = setZIndex(+d.node.style.zIndex, +d.node.style.zIndex + 1);
        const Z = {id: id, z: setIndex, colName: "postItsData"};
        dispatch(fontActions.updateZIndex(Z));
    }
    const dragStop:RndDragCallback = (e:DraggableEvent, d:DraggableData, id = props.id) => {
        const XY = {id: id, x: d.x, y: d.y, colName: "postItsData"}
        dispatch(fontActions.updateXYPosition(XY));
    }
    const resizeStart:RndResizeCallback = (e, d, ref, delta, position) => {
        setFirstLoad(false);
        setPicWidth(+ref.style.width.replace("px", ""));
        setPicHeight(+ref.style.height.replace("px", ""));
        setDiagramWidth(ref.style.width);
        setDiagramHeight(ref.style.height);
    }
    const resizeStop:RndResizeCallback = (e, d, ref, delta, position, id = props.id) => {
        const width = props.width + delta.width
        const height = props.height + delta.height
        const XYHW = {id: id, x: position.x, y: position.y, h: height, w: width, colName: "postItsData"}
        dispatch(fontActions.updateWHPosition(XYHW));
    }
    return(
        <Rnd minWidth={100} minHeight={100} bounds={"parent"} disableDragging={draggable}
             default={{x: props.positionX, y: props.positionY, width: props.width, height: props.height + 23}}
             onDragStart={dragStart}
             onDragStop={dragStop}
             onResize={resizeStart}
             onResizeStop={resizeStop}
             style={{zIndex: props.positionZ}}
        >
            <PostIt style={{width: diagramWidth, height: diagramHeight + 23}}
                 onMouseEnter={mouseIn} onMouseLeave={mouseOut}>
                <WindowTab ref={tabRef}>
                    <span onClick={closeEvent}><FontAwesomeIcon style={{color:"red", marginRight:"0.2em"}} icon={faCircleXmark}/></span>
                    <span onClick={pinEvent}><FontAwesomeIcon style={{color:draggable?"green":"#D6D01F", marginRight:"0.2em"}} icon={faThumbtack}/></span>
                </WindowTab>
                <Content style={{
                    width: isFirstLoad ? props.width : +picWidth,
                    height: isFirstLoad ? props.height : +picHeight - 23,
                    rotate: `${degree}deg`,
                    fontFamily: props.style.toString(),
                    color: props.color,
                }} ref={borderRef} onWheel={wheelEvent}>
                    {props.content}
                </Content>
            </PostIt>
        </Rnd>
    )
}

export default FontPostIt;
const PostIt = styled.div`
  overflow: hidden;
  user-select: none;
  transition: all 0.1s ease-out;
`;
const WindowTab = styled.span`
  position: relative;
  top: -23px;
  cursor: pointer;
  transition: all 0.3s ease-out;
`;
const Content = styled.div`
  font-size: 5em;
  display : flex;
  justify-content : center;
  align-items : center;
`;
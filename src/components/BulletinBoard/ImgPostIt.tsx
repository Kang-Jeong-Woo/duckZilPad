import React, {useRef, useState} from "react";
import {useAppDispatch} from "@/store/hooks";
import {ImgActions} from "@/store/slices/img-slice";
import {DraggableData, Rnd, RndDragCallback, RndResizeCallback} from "react-rnd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark, faThumbtack} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import {DraggableEvent} from "react-draggable";
import styled from "styled-components";

const ImgPostIt:React.FC<{
    id:string,
    content:string,
    title:string,
    width:number,
    height:number,
    pinned:boolean,
    positionX:number,
    positionY:number,
    positionZ:number,
}> = props => {
    const dispatch = useAppDispatch();
    const tabRef = useRef<HTMLSpanElement>(null);
    const [draggable, setDraggable] = useState<boolean>(false);
    const [diagramWidth, setDiagramWidth] = useState<number>();
    const [diagramHeight, setDiagramHeight] = useState<number>();
    const [picWidth, setPicWidth] = useState<number>();
    const [picHeight, setPicHeight] = useState<number>();
    const [isFirstLoad, setFirstLoad] = useState<boolean>(true);
    const setZIndex = (cur:number, next:number) => {
        return next > cur ? next : cur;
    }
    const pinEvent = () => {setDraggable(!draggable)};
    const closeEvent = () => {dispatch(ImgActions.deleteImg(props.id))};
    const mouseIn = () => {tabRef.current!.style.top = "0px"};
    const mouseOut = () => {tabRef.current!.style.top = "-23px"};
    const dragStart:RndDragCallback = (e:DraggableEvent, d:DraggableData, id = props.id) => {
        const setIndex = setZIndex(+d.node.style.zIndex, +d.node.style.zIndex + 1);
        const Z = {id: id, z: setIndex, colName: "postItsData"};
        dispatch(ImgActions.updateZIndex(Z));
    }
    const dragStop:RndDragCallback = (e:DraggableEvent, d:DraggableData, id = props.id) => {
        const XY = {id: id, x: d.x, y: d.y, colName: "postItsData"}
        dispatch(ImgActions.updateXYPosition(XY));
    }
    const resizeStart:RndResizeCallback = (e, d, ref, delta, position) => {
        setFirstLoad(false);
        setPicWidth(+ref.style.width.replace("px", ""));
        setPicHeight(+ref.style.height.replace("px", ""));
        setDiagramWidth(+ref.style.width);
        setDiagramHeight(+ref.style.height);
    }
    const resizeStop:RndResizeCallback = (e, d, ref, delta, position, id = props.id) => {
        const width = props.width + delta.width
        const height = props.height + delta.height
        const XYHW = {id: id, x: position.x, y: position.y, h: height, w: width, colName: "postItsData"}
        dispatch(ImgActions.updateWHPosition(XYHW));
    }
    return(
        <Rnd minWidth={100}
             minHeight={100}
             bounds={"parent"}
             default={{x: props.positionX, y: props.positionY, width: props.width, height: +props.height + 23}}
             disableDragging={draggable}
             onDragStart={dragStart}
             onDragStop={dragStop}
             onResize={resizeStart}
             onResizeStop={resizeStop}
             style={{zIndex: props.positionZ}}
        >
            <PostIt style={{width: diagramWidth, height: +diagramHeight! + 23}}
                 onMouseEnter={mouseIn} onMouseLeave={mouseOut}>
                <WindowTab ref={tabRef}>
                    <span onClick={closeEvent}><FontAwesomeIcon style={{color:"red", marginRight:"0.2em"}} icon={faCircleXmark}/></span>
                    <span onClick={pinEvent}><FontAwesomeIcon style={{color:draggable?"green":"#D6D01F", marginRight:"0.2em"}} icon={faThumbtack}/></span>
                </WindowTab>
                <Content>
                    <Image src={props.content} alt={props.title} width={isFirstLoad ? props.width : +picWidth!}
                           height={isFirstLoad ? props.height : +picHeight! - 23}/>
                </Content>
            </PostIt>
        </Rnd>
    )
}

export default ImgPostIt;
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
  display : flex;
  justify-content : center;
  align-items : center;
`;
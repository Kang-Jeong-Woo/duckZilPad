import React, {useRef, useState} from "react";
import {useAppDispatch} from "@/store/hooks";
import {DraggableData, Rnd, RndDragCallback, RndResizeCallback} from "react-rnd";
import {DraggableEvent} from "react-draggable";
import {postItDataActions} from "@/store/slices/postItDataSlice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowDownWideShort,
    faArrowsLeftRightToLine,
    faCheck,
    faCircleXmark,
    faGears, faThumbtack
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const TablePostIt: React.FC<{
    id: string,
    content: {titles: string[], contents: string[][]},
    pinned: boolean,
    style: {font?: string},
    color: {font?: string, border?: string, back?: string},
    width: number,
    height: number,
    positionX: number,
    positionY: number,
    positionZ: number,
}> = props => {
    const dispatch = useAppDispatch();
    const tabRef = useRef<HTMLSpanElement>(null);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [draggable, setDraggable] = useState<boolean>(false);
    const [diagramWidth, setDiagramWidth] = useState<number>();
    const [diagramHeight, setDiagramHeight] = useState<number>();
    const [picWidth, setPicWidth] = useState<number>();
    const [picHeight, setPicHeight] = useState<number>();
    const [isFirstLoad, setFirstLoad] = useState<boolean>(true);
    const colName = 'table'
    const setZIndex = (cur:number, next:number) => {
        return next > cur ? next : cur;
    }
    const pinEvent = () => {setDraggable(!draggable)};
    const editEvent = () => {setIsEdit(!isEdit)};
    const closeEvent = () => {dispatch(postItDataActions.deleteData({colName: colName, id: props.id}))};
    const mouseIn = () => {tabRef.current!.style.top = "0px"};
    const mouseOut = () => {tabRef.current!.style.top = "-23px"};
    const dragStart:RndDragCallback = (e:DraggableEvent, d:DraggableData, id = props.id) => {
        const setIndex = setZIndex(+d.node.style.zIndex, +d.node.style.zIndex + 1);
        dispatch(postItDataActions.updateZIndex({id: id, z: setIndex, colName: colName}));
    }
    const dragStop:RndDragCallback = (e:DraggableEvent, d:DraggableData, id = props.id) => {
        dispatch(postItDataActions.updateXYPosition({id: id, x: d.x, y: d.y, colName: colName}));
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
        dispatch(postItDataActions.updateWHPosition({id: id, x: position.x, y: position.y, h: height, w: width, colName: colName}));
    }

    const editComponent = (<>
        <TabText>
            <FontAwesomeIcon style={{color: "orange"}} icon={faArrowsLeftRightToLine}/>
            <button onClick={() => {dispatch(postItDataActions.addTableColumn({colName: colName, id: props.id}))}}>+</button>
            {props.content.titles.length}
            <button onClick={() => {dispatch(postItDataActions.deleteTableColumn({colName: colName, id: props.id}))}}>-</button>
        </TabText>
        <TabText>
            <FontAwesomeIcon style={{color: "orange"}} icon={faArrowDownWideShort}/>
            <button onClick={() => {dispatch(postItDataActions.addTableRow({colName: colName, id: props.id}))}}>+</button>
            {props.content.contents.length}
            <button onClick={() => {dispatch(postItDataActions.deleteTableRow({colName: colName, id: props.id}))}}>-</button>
        </TabText>
        <TabBtn onClick={editEvent}>
            <FontAwesomeIcon style={{color: "green"}} icon={faCheck}/>
        </TabBtn>
    </>)

    const defaultComponent = (<>
        <span onClick={closeEvent}>
            <FontAwesomeIcon style={{color: "red"}} icon={faCircleXmark}/>
        </span>
        <span onClick={editEvent}>
            <FontAwesomeIcon style={{color: "#D6D01F"}} icon={faGears}/>
        </span>
        <span onClick={pinEvent}>
            <FontAwesomeIcon style={{color: draggable ? "green" : "#D6D01F"}} icon={faThumbtack}/>
        </span>
    </>)

    const titleComponent = (<>
        {props.content.titles.map((title, index) => (
            <td key={"T" + index} style={{border: `${props.color.border} 1px solid`}}>{title}</td>
        ))}
    </>)

    const titleEditComponent = (<>
        {props.content.titles.map((title, index) => (
            <td key={"T" + index} style={{border: `${props.color.border} 1px solid`}}>
                <EditInput type={"text"} defaultValue={title} onChange={e => {
                       dispatch(postItDataActions.updateTableTitle({
                           colName: colName, id: props.id, i: index, type: "title", value: e.target.value
                       }))
                   }}
                />
            </td>
        ))}
    </>)

    const contentComponent = (<>
        {props.content.contents.map((content, index) => (
            <tr key={"B" + index} style={{border: `${props.color.border} 1px solid`}}>
                {content.map((data, index) => (
                    <td key={index} style={{border: `${props.color.border} 1px solid`}}>{data}</td>
                ))}
            </tr>
        ))}
    </>)

    const contentEditComponent = (<>
        {props.content.contents.map((content, colIndex) => {
            return (
                <tr key={"B" + colIndex} style={{border: `${props.color.border} 1px solid`}}>
                    {content.map((data, index) => (
                        <td key={index} style={{border: `${props.color.border} 1px solid`}}>
                            <EditInput type={"text"} defaultValue={data} onChange={e => {
                                dispatch(postItDataActions.updateTableContent({
                                   colName: colName,
                                   id: props.id,
                                   column: colIndex,
                                   type: "content",
                                   i: index,
                                   value: e.target.value
                                   }))
                               }}
                            />
                        </td>
                    ))}
                </tr>
            )
        })}
    </>)

    return(
        <Rnd minWidth={100} minHeight={100} bounds={"parent"}
             default={{x: props.positionX, y: props.positionY, width: props.width, height: props.height + 23}}
             disableDragging={draggable} onDragStart={dragStart} onDragStop={dragStop} onResize={resizeStart}
             onResizeStop={resizeStop}
             style={{zIndex: props.positionZ}}
        >
            <PostIt style={{width: diagramWidth, height: diagramHeight! + 23}}
                 onMouseEnter={mouseIn} onMouseLeave={mouseOut}>
                <WindowTab ref={tabRef}>
                    {isEdit ? editComponent : defaultComponent}
                </WindowTab>
                <UserTable style={{
                    width: isFirstLoad ? props.width : +picWidth!,
                    height: isFirstLoad ? props.height : +picHeight! - 23,
                    background: props.color.back,
                    color: props.color.font,
                    border: `${props.color.border} 2px solid`,
                    fontFamily: props.style.font
                }}>
                    <thead style={{border: `${props.color.border} 1px solid`}}>
                    <tr>
                        {isEdit ? titleEditComponent : titleComponent}
                    </tr>
                    </thead>
                    <tbody>
                    {isEdit ? contentEditComponent : contentComponent}
                    </tbody>
                </UserTable>
            </PostIt>
        </Rnd>
    )
}

export default TablePostIt
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
const UserTable = styled.table`
  position: relative;
  margin-left: auto;
  border-collapse: collapse;
  text-align: center;
  vertical-align: middle;
  word-break: break-all;
  table-layout: fixed;
`;
const TabBtn = styled.span`
  height: 23px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
`;
const TabText = styled.span`
  height: 23px;
  text-align: center;
  vertical-align: middle;
  cursor: auto;
  margin-right: 0.5em;
`;
const EditInput = styled.input`
  border: none;
  width: 80%;
`;

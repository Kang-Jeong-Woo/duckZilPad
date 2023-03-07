import styled from "styled-components";
import React, { useRef, useState } from "react";
import {RootState} from "@/store/store";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import ImgPostIt from "@/components/BulletinBoard/ImgPostIt";
import FontPostIt from "@/components/BulletinBoard/FontPostIt";
import TablePostIt from "@/components/BulletinBoard/TablePostIt";
import Canvas from "@/components/BulletinBoard/Canvas";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowsUpDownLeftRight} from "@fortawesome/free-solid-svg-icons";
import { setDragIsMode, setIsDrag } from "@/store/slices/modeSlice";

const BulletinBoard = () => {
    const dispatch = useAppDispatch();
    const tablesData = useAppSelector((state: RootState) => state.data.tableData);
    const fontsData = useAppSelector((state: RootState) => state.data.fontData);
    const ImgsData = useAppSelector((state: RootState) => state.data.imgData);
    const dragMode = useAppSelector((state: RootState)=> state.mode.dragMode);
    const bodyRef = useRef<HTMLDivElement>(null);
    const [startX, setStartX] = useState<number>();
    const [startY, setStartY] = useState<number>();
    // window 마우스 터치 이벤트
    const onDragStart = (e:any) => {
        if(dragMode.isMode===false){
            return
        }
        dispatch(setIsDrag(true));
        setStartX(e.pageX + bodyRef.current!.scrollLeft);
        setStartY(e.pageY + bodyRef.current!.scrollTop);
    };
    const onDragMove = (e:any) => {
        if(dragMode.isMode===false){
            return
        }
        if (dragMode.isDrag) {
            bodyRef.current!.scrollLeft = startX! - e.pageX;
            bodyRef.current!.scrollTop = startY! - e.pageY;
        }
    };
    // mobile 디바이스 터치 이벤트
    const onTouchDragStart = (e:any) => {
        if(dragMode.isMode===false){
            return
        }
        dispatch(setIsDrag(true));
        setStartX(e.touches[0].pageX + bodyRef.current!.scrollLeft);
        setStartY(e.touches[0].pageY + bodyRef.current!.scrollTop);
    };
    const onTouchDragMove = (e:any) => {
        if(dragMode.isMode===false){
            return
        }
        if (dragMode.isDrag) {
            bodyRef.current!.scrollLeft = startX! - e.touches[0].pageX;
            bodyRef.current!.scrollTop = startY! - e.touches[0].pageY;
        }
    };
    const onDragEnd = () => {dispatch(setIsDrag(false));};
    return (
        <Body
            ref={bodyRef}
            onMouseDown={onDragStart}
            onMouseMove={onDragMove}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
            onTouchStart={onTouchDragStart}
            onTouchMove={onTouchDragMove}
            onTouchEnd={onDragEnd}
            onTouchCancel={onDragEnd}
        >
            <BulletinBoardCntnr>

                <MoveWrapper htmlFor={"move"}>
                    <input hidden={true} type="checkbox" id={"move"} onChange={()=>dispatch(setDragIsMode())}/>
                    <MoveBtn><FontAwesomeIcon icon={faArrowsUpDownLeftRight}/></MoveBtn>
                </MoveWrapper>

                {ImgsData.map((img) => (
                    img.isDelete === false && <ImgPostIt
                        key={img._id}
                        id={img._id}
                        content={img.content}
                        title={img.title}
                        width={img.width}
                        height={img.height}
                        pinned={img.pinned}
                        positionX={img.positionX}
                        positionY={img.positionY}
                        positionZ={img.positionZ}
                        tempUrl={img?.tempUrl}
                    />
                ))}
                {fontsData.map((font) => (
                    font.isDelete === false && <FontPostIt
                        key={font._id}
                        id={font._id}
                        content={font.content}
                        style={font.style}
                        degree={font.degree}
                        color={font.color}
                        pinned={font.pinned}
                        width={font.width}
                        height={font.height}
                        positionX={font.positionX}
                        positionY={font.positionY}
                        positionZ={font.positionZ}
                    />
                ))}
                {tablesData.map((table) => (
                    table.isDelete === false && <TablePostIt
                        key={table._id}
                        id={table._id}
                        content={table.contents}
                        style={table.style}
                        color={table.color}
                        width={table.width}
                        height={table.height}
                        pinned={table.pinned}
                        positionX={table.positionX}
                        positionY={table.positionY}
                        positionZ={table.positionZ}
                    />
                ))}
                <Canvas/>
            </BulletinBoardCntnr>
        </Body>
    )
};

export default BulletinBoard;
const Body = styled.div`
  background-color: #F2F2F2;
  overflow: scroll;
  height: 1000px;
  ::-webkit-scrollbar {
    display: none;
}
`;
const BulletinBoardCntnr = styled.div`
  width: 3000px;
  height: 3000px;
  background-color: #F2F2F2;
  position: relative;
`;
const MoveBtn = styled.span`
  list-style: none;
  cursor: pointer;
  width: 33px;
  height: 33px;
  border-radius: 3rem;
  position: fixed;
  top: 28px;
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
`;
const MoveWrapper = styled.label`
  & input {
    &:checked + ${MoveBtn}{
      box-shadow:0px 0px black;
      background-color: #D6D01F;
    }
  }
`;
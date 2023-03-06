import styled from "styled-components";
import React, { useRef, useState } from "react";
import {RootState} from "@/store/store";
import {useAppSelector} from "@/store/hooks";
import ImgPostIt from "@/components/BulletinBoard/ImgPostIt";
import FontPostIt from "@/components/BulletinBoard/FontPostIt";
import TablePostIt from "@/components/BulletinBoard/TablePostIt";
import Canvas from "@/components/BulletinBoard/Canvas";

const BulletinBoard = () => {
    const tablesData = useAppSelector((state: RootState) => state.data.tableData);
    const fontsData = useAppSelector((state: RootState) => state.data.fontData);
    const ImgsData = useAppSelector((state: RootState) => state.data.imgData);
    const bodyRef = useRef<HTMLDivElement>(null);
    const [isDrag, setIsDrag] = useState<boolean>(false);
    const [startX, setStartX] = useState<number>();
    const [startY, setStartY] = useState<number>();
    const onDragStart = (e:any) => {
        e.preventDefault();
        setIsDrag(true);
        setStartX(e.pageX + bodyRef.current!.scrollLeft);
        setStartY(e.pageY + bodyRef.current!.scrollTop);
        console.log(bodyRef.current!.scrollLeft, bodyRef.current!.scrollTop)
    };
    const onDragEnd = () => {
        setIsDrag(false);
    };
    const onDragMove = (e:any) => {
        if (isDrag) {
            bodyRef.current!.scrollLeft = startX! - e.pageX;
            bodyRef.current!.scrollTop = startY! - e.pageY;
        }
    };

    return (
        <Body
            ref={bodyRef}
            onMouseDown={onDragStart}
            onMouseMove={onDragMove}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
        >
            <BulletinBoardCntnr>
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
  overflow: hidden;
`;
const BulletinBoardCntnr = styled.div`
  width: 3000px;
  height: 3000px;
  background-color: #F2F2F2;
  position: relative;
  overflow: auto;
`;
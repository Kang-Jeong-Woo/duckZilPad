import styled from "styled-components";
import React from "react";
import {RootState} from "@/store/store";
import {useAppSelector} from "@/store/hooks";
import ImgPostIt from "@/components/BulletinBoard/ImgPostIt";
import FontPostIt from "@/components/BulletinBoard/FontPostIt";
import TablePostIt from "@/components/BulletinBoard/TablePostIt";
import Canvas from "@/components/BulletinBoard/Canvas";

const BulletinBoard: React.FC<{
    onDragPst: () => void; onSizePst:()=>void; onZPst:()=>void; onSaveDraw: () => void;
}> = (props) => {

    const tablesData = useAppSelector((state: RootState) => state.table.tableData);
    const fontsData = useAppSelector((state: RootState) => state.font.fontData);
    const ImgsData = useAppSelector((state: RootState) => state.img.ImgData);

    return (
        <Body>
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
                        onDragPst={props.onDragPst}
                        onSizePst={props.onSizePst}
                        onZpst={props.onZPst}
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
                        onDragPst={props.onDragPst}
                        onSizePst={props.onSizePst}
                        onZpst={props.onZPst}
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
                        onDragPst={props.onDragPst}
                        onSizePst={props.onSizePst}
                        onZpst={props.onZPst}
                    />
                ))}
                <Canvas onSaveDraw={props.onSaveDraw}/>
            </BulletinBoardCntnr>
        </Body>
    )
};
export default BulletinBoard;
const Body = styled.div`
  overflow: hidden;
`;
const BulletinBoardCntnr = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

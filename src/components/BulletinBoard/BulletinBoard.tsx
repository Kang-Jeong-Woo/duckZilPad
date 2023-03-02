import styled from "styled-components";
import React from "react";
import {useSelector} from "react-redux";

const BulletinBoard:React.FC<{

}> = (props) => {
    const tableData = useSelector(state: => (state.table.tableData))
    return(
        <div>

        </div>
    )
}
export default BulletinBoard;
const Body = styled.div`
  overflow: hidden;
`;
const BulletinBoardCntnr = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

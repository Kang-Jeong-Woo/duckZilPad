import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons/faCheckCircle";
import React from "react";

const AlertCntnr = styled.div`
  width: 100px;
  height: 50px;
  opacity: 0.8;
  background-color: #111111;
`;

const Alert:React.FC<{
    messages:string
}> = (props) => {
    return(
        <AlertCntnr><FontAwesomeIcon icon={faCheckCircle}/>{props.messages}</AlertCntnr>
    )
}

export default Alert
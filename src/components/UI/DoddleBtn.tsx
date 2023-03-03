import React, {ReactNode} from "react";
import styled from "styled-components";

const DoddleButton:React.FC<{
    children:ReactNode
    onClick:()=>void
}> = (props) => {
    const clickTrigger = () => {
        props.onClick();
    }
    return(
        <DoodleBtn role="button" onClick={clickTrigger}>{props.children}</DoodleBtn>
    )
}

export default DoddleButton;
const DoodleBtn = styled.button`
  list-style: none;
  cursor: pointer;
  width: 100%;
  height: 33px;
  border-radius: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: fantasy;
  font-size: larger;
  position: relative;
  padding: 0 20px;
  background-color: #fcf614;
  color: #111;
  border: 2px solid #111;
  box-shadow: 4px 4px black;
  transition: 0.6s;
  &:active{
    background-color: #D6D01F;
    outline: 0;
  } &:hover{
    background-color: #D6D01F;
    outline: 0;
    box-shadow:0px 0px black;
  } &:hover:after {
    transform: translate(0, 0);
  } 
`;
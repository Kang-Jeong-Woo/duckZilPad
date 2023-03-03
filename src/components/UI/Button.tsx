import React from "react";
import styled from "styled-components";
const Button:React.FC<{
    children:React.ReactNode
    onClick:()=>void
}> = (props) => {
    const clickTrigger = () => {
        props.onClick();
    }
    return(
        <CstBtn role="button" onClick={clickTrigger}>{props.children}</CstBtn>
    )
}

export default Button;
const CstBtn = styled.button`
  background-color: #EBE51E;
  border: 0 solid #E5E7EB;
  box-sizing: border-box;
  color: #000000;
  display: flex;
  font-family: ui-sans-serif, system-ui, -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 1em;
  font-weight: 700;
  justify-content: center;
  align-items: center;
  line-height: 1.75em;
  padding: .75em 1.65em;
  position: relative;
  text-align: center;
  text-decoration: none #000000 solid;
  text-decoration-thickness: auto;
  width: 50%;
  height: 2em;
  max-width: 460px;
  position: relative;
  cursor: pointer;
  transform: rotate(-2deg);
  user-select: none;
  touch-action: manipulation;
  &:focus{
    outline: 0;
  }
  &:after{
    content: '';
    position: absolute;
    border: 1px solid #000000;
    bottom: 4px;
    left: 4px;
    width: calc(100% - 1px);
    height: calc(100% - 1px);
  }
  &:hover:after{
    content: "Logout";
    background-color: #D6D01F;
    bottom: 2px;
    left: 2px;
  }
`;


import classes from "./Card.module.css";
import React from "react";
import styled from "styled-components";

const Card: React.FC<{
    children: React.ReactNode
    onClick: () => void
}> = props => {
    return (<CstCard onClick={props.onClick}>{props.children}</CstCard>)
}
export default Card;
const CstCard = styled.div`
  margin: 1rem;
  padding: 2rem;
  background-color: lightpink;
  border: hotpink 3px solid;
  transition: 0.5s;
  display: flex;
  cursor: pointer;
  &:hover{
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
    transform: translate(0, -5px);
  }
`;
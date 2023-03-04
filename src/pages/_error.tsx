import styled from "styled-components";
import {router} from "next/client";

const Error = () => {
    const goHomePage = () => {
        router.push("/");
    }
    return(
        <ErrorCntnr onClick={goHomePage}>Error! X_X</ErrorCntnr>
    )
}
export default Error;
const ErrorCntnr = styled.div`
  background-color: #F2F2F2;
  color: black;
  font-family: fantasy;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  font-size: xxx-large;
  cursor: pointer;
`;
import styled from "styled-components";

const Loading = () => {
    return(
        <LoadingState>Loading...</LoadingState>
    )
}
export default Loading
const LoadingState = styled.div`
  background-color: #F2F2F2;
  color: black;
  font-family: fantasy;
  font-size: xxx-large;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;
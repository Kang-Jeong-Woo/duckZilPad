import styled from "styled-components";

const Loading = () => {
    return(
        <LoadingSpinner>Loading...</LoadingSpinner>
    )
}
export default Loading
const LoadingSpinner = styled.div`
  background-color: #F2F2F2;
  color: black;
  font-family: fantasy;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  font-size: xxx-large;
`;
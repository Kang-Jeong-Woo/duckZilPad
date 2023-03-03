import Image from "next/image";
import postEx from "/public/postEx.png";
import canvasEx from "/public/canvasEx.png";
import saveEx from "/public/saveEx.png";
import React from "react";
import styled from "styled-components";

const MainPage:React.FC = () => {
    return (
        <>
            <DescWrapper>
                <Title>1. Draw with canvas feature!</Title>
                <ContentCntnr>
                    <VideoCntnr>
                        <Image src={canvasEx} alt={"캔버스 그리기 기능"} width={300} height={300}/>
                    </VideoCntnr>
                    <span>U can easily on/off pen feature<br/>also u can adjust pen size<br/>And choose the color u want!</span>
                </ContentCntnr>

                <Title>2. Add this and that!</Title>
                <ContentCntnr>
                    <span>
                        Bring pictures to ur sketchBook!<br/>
                        Organize pictures, fonts, tables and decorate something you like.<br/>
                    </span>
                    <VideoCntnr>
                        <Image src={postEx} alt={"다양한 포스트 기능"} width={300} height={300}/>
                    </VideoCntnr>
                </ContentCntnr>

                <Title>3. Save the last work you did!</Title>
                <ContentCntnr>
                    <VideoCntnr>
                        <Image src={saveEx} alt={"저장 기능"} width={300} height={300}/>
                    </VideoCntnr>
                    <span>U can save the work u did with the Save button!</span>
                </ContentCntnr>
            </DescWrapper>
        </>
    )
}
export default MainPage;
const Title = styled.h2`
  margin: 10px;
  font-family: cursive;
`;
const DescWrapper = styled.div`
  padding: 10px;
`;
const ContentCntnr = styled.div`
  display: flex;
  &span{
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: fantasy;
    font-size: xxx-large;
    min-width: 357px;
  }
`;
const VideoCntnr = styled.div`
  margin: 20px;
  min-width: 300px;
  min-height: 300px;
`;

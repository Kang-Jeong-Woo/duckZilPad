'use client';
import Image from "next/image";
import styled from "styled-components";

const LogoDiv = styled.div`
    display: block;
    text-align: center;
    margin-top: 10px;
    padding-bottom: 10px;
`;

export default function Logo() {

    return(

        <LogoDiv>
            <Image src="/logo.jpg" alt="logo" width={120} height={80} style={{borderRadius: 20}}/>
        </LogoDiv>
    )
}

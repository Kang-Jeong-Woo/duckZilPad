'use client';
import styled from "styled-components";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { 
    setSignUpData,
    userIdCheck,
    passwordCheck,
    nickCheck } from "../store/slices/signUpSlice";
import { setLoginMode } from "../store/slices/modeSlice";
import SubmitBtn from "@/app/components/UI/SubmitBtn";
import Logo from "./UI/Logo";
import { useEffect } from "react";

export default function signUp () {

    const dispatch = useDispatch();

    // 회웝가입 데이터
    const signUpData = useSelector((state: RootState)=> state.signUp.signUpData);
    // 회원가입 메세지
    const signUpMessage = useSelector((state: RootState)=> state.signUp.meassage);
    // 회원가입 유효성검사 결과
    const signUpValidation = useSelector((state: RootState)=> state.signUp.validation);

    // 서버에 회원가입 요청
    const signUp = () => {
        axios.post(
            "http://localhost:8123/api/signup",
            { userId: signUpData.userId, password: signUpData.password, nick: signUpData.nick },
            { withCredentials: true }
        )
        .then((result) => {
            if (result.status === 200) {
                console.log(result.data)
                dispatch(setLoginMode())
            }
        })
        .catch((error)=>{
            console.log(error)
            alert("Server error : registration failed")
        });
    }

    // 서버에 아이디 중복체크 요청
    const idCheck = () => {
        axios.get(
            "http://localhost:8123/api/signup/idcheck",
            { params: { userId: signUpData.userId }, withCredentials: true },
        )
        .then((result) => {
            if (result.status === 200) {
                console.log(result.data)
                dispatch(userIdCheck(result.data))
            }
        })
        .catch((error)=>{
            console.log(error)
        });
    }

    // 데이터가 바뀌면 유효성검사
    useEffect(()=>{
        if(signUpData.passwordConfim !== undefined || signUpData.password !== undefined) {
            dispatch(passwordCheck())
        }
    }, [signUpData.password])

    useEffect(()=>{
        if(signUpData.nick !== undefined) {
            dispatch(nickCheck())
        }
    }, [signUpData.nick])

    return (
        <Body>
            <Container>
                <Logo />
                <Title>Sign-up</Title>
                <Wrapper>
                    <Input
                        defaultValue={signUpData.userId} 
                        placeholder="User-Id" 
                        onChange={(e)=>{dispatch(setSignUpData({ type: 'userId', value: e.target.value }))}}
                    />
                    <CheckBtn onClick={idCheck}>Check</CheckBtn>
                    <SignUpMessage style={{
                        color: signUpValidation.isUserId === true ? "blue" : "red"
                    }}>&nbsp;{ signUpMessage.userIdMessage }</SignUpMessage>
                </Wrapper>
                <Wrapper>
                    <Input 
                        type="password" 
                        defaultValue={signUpData.password} 
                        placeholder="Password" 
                        onChange={(e)=>{
                            dispatch(setSignUpData({ type: 'password', value: e.target.value } ))
                        }}
                    />
                    <SignUpMessage>&nbsp;</SignUpMessage>
                </Wrapper>
                <Wrapper>
                    <Input 
                        type="password" 
                        defaultValue={signUpData.passwordConfim} 
                        placeholder="Confim Password" 
                        minLength={5} 
                        onChange={(e)=>{
                            dispatch(setSignUpData({ type: 'passwordConfim', value: e.target.value } ))
                        }} 
                    />
                    <SignUpMessage style={{
                        color: signUpValidation.isPassword === true ? "blue" : "red"
                    }}>&nbsp;{ signUpMessage.passwordMessage }</SignUpMessage>
                </Wrapper>
                <Wrapper>
                    <Input 
                        defaultValue={signUpData.nick} 
                        placeholder="Nick" 
                        maxLength={10}
                        onChange={(e)=>{dispatch(setSignUpData({ type: 'nick', value: e.target.value } ))}}
                    />
                    <SignUpMessage style={{
                        color: signUpValidation.isNick === true ? "blue" : "red"
                    }}>&nbsp;{ signUpMessage.nickMessage }</SignUpMessage>
                </Wrapper>
                <Wrapper>
                    <ModeMessage>Already have an account?</ModeMessage>
                    <ModeBtn onClick={()=>{dispatch(setLoginMode())}}>Log-in</ModeBtn>
                    <SubmitBtn onClick={()=>{
                        if(signUpValidation.isUserId && signUpValidation.isPassword && signUpValidation.isNick) {
                            signUp()
                        } else {
                            idCheck()
                            dispatch(passwordCheck())
                            dispatch(nickCheck())
                        }
                    }}>Sign-up</SubmitBtn>
                </Wrapper>
            </Container>
        </Body>
    ) 
}

// styled components
const Body = styled.div`
    width: 100%;
    height: 95vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 4rem 0;
`
const Container = styled.div`
    background: snow;
    width: 320px;
    padding: 20px;
    padding-top: 10px;
    margin: auto;
    display: block;
    border: 1px gray solid;
    border-radius: 20px;
`

const Title = styled.h2`
    text-align: center;
    padding-bottom: 20px;
    color: rgba(0, 0, 0, 0.636);
`

const Wrapper = styled.div`
    text-align: center;
    margin-bottom: 10px;
`

const Input = styled.input`
    font-size: 16px;
    height: 30px;
    padding-left: 10px;
    margin-right: 3px;
    display: inline-block;
    border: 0px;
    border-bottom: 1px solid gray;
    width: ${props => props.placeholder === "User-Id" && '140px' };
`

const CheckBtn = styled.span`
    font-size: 16px;
    line-height: 30px;
    padding-left: 5px;
    padding-right: 5px;
    color: gray;
    background: whitesmoke;
    border: 1px solid gray;
    display: inline-block;
    cursor: pointer;
    border-radius: 10px;
    &:hover {
        font-size: 16px;
        line-height: 30px;
        padding-left: 5px;
        padding-right: 5px;
        color: #FF6EC7;
        background: whitesmoke;
        border: 1px solid #FF6EC7;
        display: inline-block;
        cursor: pointer;
        border-radius: 10px;
    }
`

const SignUpMessage = styled.p`
    color: "red";
    display: block;
    text-align: left;
    padding-left: 60px;
    font-size: 10px;
    line-height: 10px;
    margin-top: 5px;
`

const ModeMessage = styled.span`
    display: inline-block;
    padding-bottom: 15px;
    padding-right: 10px;
    color: black;
`

const ModeBtn = styled.a`
    color: #FF6EC7;
    cursor: pointer;
    text-decoration: underline;
    &:hover {
        color: tomato;
        font-weight: bold;
    }
`
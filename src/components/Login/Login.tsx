import styled from "styled-components";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { setLoginData, setLoginMessage } from "@/store/slices/loginSlice";
import { setSignUpMode } from "@/store/slices/modeSlice";
import DoddleBtn from "@/components/UI/DoddleBtn";
import Logo from "@/components/UI/Logo";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { setCookie } from "@/lib/cookie";


export default function Login() {

    const router = useRouter();
    const dispatch = useAppDispatch();

    // 로그인 데이터
    const loginData = useAppSelector((state: RootState)=> state.login.loginData);
    // 로그인 메세지
    const loginMessage = useAppSelector((state: RootState)=> state.login.message);
    // 서버에 로그인요청
    async function login () {
        if(loginData.userId === '' || loginData.password === '') {
            dispatch(setLoginMessage("Please enter user-id or password."))
        } else {
            axios.post(
                "/api/login",
                { userId: loginData.userId, password: loginData.password }
            ).then((result) => {
                if (result.status === 200) {
                    const accessToken = result.data.accessToken;
                    const refreshToken = result.data.refreshToken;
                    setCookie("accessToken", accessToken, {
                        path: "/",
                        secure: false,
                        sameSite: 'strict',
                        HttpOnly: true
                    })
                    setCookie("refreshToken", refreshToken, {
                        path: "/",
                        secure: false,
                        sameSite: 'strict',
                        HttpOnly: true
                    })
                    router.push("/" + result.data.nick)
                }
              })
            .catch((error)=>{
                console.log(error)
                setLoginMessage("User.ts-id or password do not match.")
            });
        }
    }
    
    return(
        <Body>
            <Container>
                <Logo />
                <Title>Log-in</Title>
                <Wrapper>
                    <Input
                        defaultValue={ loginData.userId } 
                        placeholder="Login Id" 
                        onChange={ (e)=>{dispatch(setLoginData({ type:"userId", value: e.target.value }))} } 
                    />
                </Wrapper>
                <Wrapper>
                    <Input 
                        type="password" 
                        defaultValue={ loginData.password } 
                        placeholder="Login Password" 
                        onChange={ (e)=>{dispatch(setLoginData({ type:"password", value: e.target.value }))} } 
                    />
                    <LoginMessage>&nbsp;{ loginMessage }</LoginMessage>
                </Wrapper>
                <Wrapper>
                    <ModeMessage>Don&apos;t have an account?</ModeMessage>
                    <ModeBtn onClick={()=>{dispatch(setSignUpMode())}}>Sign-up</ModeBtn>
                    <DoddleBtn onClick={login}>Log-in</DoddleBtn>
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
    //background: snow;
    width: 20rem;
    //padding: 20px;
    //padding-top: 10px;
    margin: auto;
    display: block;
    //border: 1px gray solid;
    //border-radius: 20px;
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
    display: inline-block;
    border: 0px;
    border-bottom: 1px solid gray;
`

const LoginMessage = styled.p`
    color: red;
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




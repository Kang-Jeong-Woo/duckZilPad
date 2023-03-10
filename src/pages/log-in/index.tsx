import Head from 'next/head';
import Login from "@/components/Login/Login";
import SignUp from "@/components/Login/SignUp";
import Container from "@/components/UI/Container";
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store/store';
import logo from "../../../public/logo.jpg";

const LogInPage = () => {

    const loginMode = useAppSelector((state: RootState) => state.mode.loginMode);

    return(
        <>
            <Head>
                <meta charSet="utf-8"/>
                <title>DuckZil Pad | Log-in</title>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
                <meta name="description" content="마음껏 꾸밀 수 있는 나만의 다이어리"/>
                <meta name="keywords" content="다이어리 diary"/>
                <meta name="author" content="KangJeongWoo"/>
                <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0 minimum-scale=1.0"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>

                <meta property={"og:type"} content={"webstie"}/>
                <meta property={"og:title"} content={`Duck Zil log-in`}/>
                <meta property={"og:description"} content={`정우 & 상민's Project에 로그인 하세요!`}/>
                <meta property={"og:image"} content={`${logo}`}/>
                <meta property={"og:url"} content={`https://duck-zil-pad-axwt.vercel.app/log-in`}/>
                <meta property={"og:site_name"} content={"Duck Zil Pad"}/>

                <meta name="theme-color" content="#111111"/>
            </Head>
            <Container>
                { loginMode.isLogin ? <Login /> : <SignUp /> }
            </Container>
        </>
    )
}

export default LogInPage
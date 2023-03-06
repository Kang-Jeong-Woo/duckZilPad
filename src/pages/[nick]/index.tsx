import SideBar from "@/components/SideBar/SideBar";
import BulletinBoard from "@/components/BulletinBoard/BulletinBoard";
import styled from "styled-components";
import Head from "next/head";
import axios from "axios";
import {useEffect} from "react";
import {postItDataActions} from "@/store/slices/postItDataSlice";
import {userActions} from "@/store/slices/user-slice";
import {getCookie, setCookie} from "@/lib/cookie";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import { useRouter } from "next/navigation";
import {RootState} from "@/store/store";
import logo from "/public/logo.jpg"

function HomePage() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    // 로그인 성공시 데이터 가져오기
    useEffect(() => {
        try {
            axios.post("/api/login/success",
                {accessToken: getCookie("accessToken")})
                .then((result) => {
                    if (result.data.userData) {
                        dispatch(userActions.setUser(result.data.userData));
                        dispatch(postItDataActions.setData({
                            fontData: result.data.fontData,
                            imgData: result.data.imgData,
                            tableData: result.data.tableData,
                            drawData: result.data.drawData
                        }))
                    } else {
                        alert("데이터 로딩 실패");
                    }
                })
                .catch((error) => {
                    console.log(error);
                    alert("로그인중에 문제가 생겼습니다.");
                    router.push("/")
                });
        } catch (error) {
            console.log(error);
            alert("Server error")
            router.push("/")

        }
    }, []);

    // 2시간마다 토큰 갱신
    setInterval((()=>{
        axios.post("/api/login/refreshtoken",
            {accessToken: getCookie("refreshToken")})
            .then((result) => {
                console.log(result.data)
                const accessToken = result.data.accessToken;
                setCookie("accessToken", accessToken, {
                    path: "/",
                    secure: false,
                    sameSite: 'strict',
                    HttpOnly: true
                })
            })
            .catch((error) => {
                console.log(error);
                alert("Token signing failed.")
                router.push("/")
            });
    }), 7200000)

    const userInfo = useAppSelector((state: RootState) => state.user.userData);

    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <title>DuckZil Pad | {userInfo.nick}&apos;s Create</title>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
                <meta name="description" content="마음껏 꾸밀 수 있는 나만의 다이어리"/>
                <meta name="keywords" content="다이어리 diary"/>
                <meta name="author" content="KangJeongWoo"/>
                <meta name="viewport" content="width=device-width, height=device-height, user-scalable=no, initial-scale=1.0, maximum-scale=1.0 minimum-scale=1.0"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>

                <meta property={"og:type"} content={"webstie"}/>
                <meta property={"og:title"} content={`${userInfo.nick}'s Sketch Book`}/>
                <meta property={"og:description"} content={`Check ${userInfo.nick}'s decor`}/>
                <meta property={"og:image"} content={`${logo}`}/>
                <meta property={"og:url"} content={`https://duck-zil-pad-axwt.vercel.app/${userInfo.nick}`}/>
                <meta property={"og:site_name"} content={"Duck Zil Pad"}/>

                <meta name="theme-color" content="#111111"/>
            </Head>
            <HomeCntnr>
                <SideBar/>
                <BulletinBoard/>
            </HomeCntnr>
        </>
    );
};

export default HomePage;
const HomeCntnr = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  align-items: stretch;
`;
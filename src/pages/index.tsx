import Head from 'next/head'
import MainPage from "@/components/Main/MainPage";
import Container from "@/components/UI/Container";
import logo from "../../public/logo.jpg";

export default function Home() {
    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <title>DuckZil Pad | Home</title>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
                <meta name="description" content="마음껏 꾸밀 수 있는 나만의 다이어리"/>
                <meta name="keywords" content="다이어리 diary"/>
                <meta name="author" content="KangJeongWoo"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=2.0 minimum-scale=0.1"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>

                <meta property={"og:type"} content={"webstie"}/>
                <meta property={"og:title"} content={`Duck-Zil Pad`}/>
                <meta property={"og:description"} content={`정우 & 상민's Project`}/>
                <meta property={"og:image"} content={`${logo}`}/>
                <meta property={"og:url"} content={`https://duck-zil-pad-axwt.vercel.app`}/>
                <meta property={"og:site_name"} content={"Duck Zil Pad"}/>

                <meta name="theme-color" content="#111111"/>
            </Head>
            <main>
                <Container>
                    <MainPage></MainPage>
                </Container>
            </main>
        </>
    )
}

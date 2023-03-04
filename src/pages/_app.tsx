import '@/styles/globals.css'
import {Provider} from "react-redux";
import store from "@/store/store";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { CookiesProvider } from 'react-cookie';
import {BindingSpring} from "../components/UI/BindingSpring";
import {AppProps} from "next/app";
import {useEffect, useState} from "react";
import {Router} from "next/router";
import Loading from "@/components/UI/Loading";
config.autoAddCss = false

export default function App({ Component, pageProps }:AppProps) {
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        const Start = () => {setLoading(true)}
        const End = () => {setLoading(false)}
        Router.events.on("routeChangeStart", Start);
        Router.events.on("routeChangeComplete", End);
        Router.events.on("routeChangeError", End);
        return () => {
            Router.events.off("routeChangeStart", Start);
            Router.events.off("routeChangeComplete", End);
            Router.events.off("routeChangeError", End);
        }
    }, []);
    return loading ? <Loading/>:
        (
        <>
            <CookiesProvider>
                <Provider store={store}>
                    <BindingSpring/>
                    <Component {...pageProps}/>
                    <div id={"overlay-root"}></div>
                </Provider>
            </CookiesProvider>
        </>
    )
}
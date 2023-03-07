import classes from "./Container.module.css";
import Link from "next/link";
import {useRouter} from "next/router";
import React from "react";
import {useAppSelector} from "@/store/hooks";
import {RootState} from "@/store/store";
import { getCookie } from "@/lib/cookie";

const Container:React.FC<{
    children:React.ReactNode
}> = (props) => {
    const router = useRouter();
    const userInfo = useAppSelector((state:RootState) => state.user);
    const isLoggedIn = () => {
        if(getCookie('accessToken')){
            router.push(`/${userInfo.userData.nick}`)
        }else{
            router.push("/log-in")
        }
    }

    return(
        <div className={classes.Cntnr}>
            <div className={`${classes.Nav} ${classes.border} ${classes.align}`}>
                <Link href={"/"}>Home</Link>
                <Link href={"https://github.com/Kang-Jeong-Woo/duckZilPad"}> Git hub Repository </Link>
                <button className={classes.btn} onClick={isLoggedIn}>create+</button>
            </div>
            <div className={`${classes.SideL} ${classes.border} ${classes.center}`}>광고 배너</div>
            <div className={`${classes.SideR} ${classes.border} ${classes.center}`}>광고 배너</div>
            <div className={`${classes.Content} ${classes.border}`}>{props.children}</div>
            <div className={`${classes.Footer} ${classes.border} ${classes.center}`}>© Made By 정우, 상민</div>
        </div>
    )
}

export default Container;

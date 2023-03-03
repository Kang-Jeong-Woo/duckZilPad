import classes from "./SideBar.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage, faTable, faFont, faUser} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {tableActions} from "@/store/slices/table-slice";
import {fontActions} from "@/store/slices/font-slice";
import {postItActions} from "@/store/slices/postIt-slice";
import {canvasActions} from "@/store/slices/canvas-slice";
import {addMenuActions} from "@/store/slices/addMenu-slice";
import {userActions} from "@/store/slices/user-slice"
import Modal from "@/components/UI/Modal";
import PostItForm from "@/components/Form/PostItForm";
import TableForm from "@/components/Form/TableForm";
import FontSection from "@/components/Form/FontPoistItForm";
import {useEffect, useRef, useState} from "react";
import Button from "@/components/UI/Button";
import axios from "axios";
import {useRouter} from "next/router";
import CSSTransition from "react-transition-group/CSSTransition";
import Modal2 from "@/components/UI/Modal2";
import { removeCookie } from "@/util/cookie";
// import {router} from "next/client";


const SideBar = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const userRef = useRef();
    const addMenu = useSelector(state => state.addMenu);
    const [showModal, setShowModal] = useState(false);

    const setFont = () => {
        dispatch(addMenuActions.setFont())
    }
    const setPost = () => {
        dispatch(addMenuActions.setPost())
        // setShowModal(true);
    }
    const setTable = () => {
        dispatch(addMenuActions.setTable())
    }
    const close = () => {
        dispatch(addMenuActions.close())
    }

    const mouseEnter = () => {
        userRef.current.style.left = "70px"
        userRef.current.style.opacity = "1"
    }
    const mouseLeave = () => {
        userRef.current.style.left = "-200px"
        userRef.current.style.opacity = "0"
    }

    const logout = () => {

        removeCookie("accessToken");
        dispatch(tableActions.tableClear());
        dispatch(fontActions.fontClear());
        dispatch(postItActions.postItClear());
        dispatch(canvasActions.canvasClear());
        dispatch(userActions.userClear());
        router.push("/");
  
    }

    return (
        <div className={classes.Cntnr}>
            <ul>

                <li onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
                    <FontAwesomeIcon icon={faUser}/>
                    <div className={classes.userInfoCntnr} ref={userRef}>
                        <div className={classes.userInfo} style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            letterSpacing: "2px",
                            marginBottom: "-5px"
                        }}>{props.user.nick}</div>
                        <div className={classes.btnCntnr}>
                            <Button onClick={logout}>LogOut</Button>
                        </div>
                    </div>
                </li>

                <li onClick={setPost}>
                    <FontAwesomeIcon icon={faImage}/>
                    {addMenu.modal && addMenu.post &&
                        <Modal onClose={close}><PostItForm userId={props.user.userId}/></Modal>}
                </li>
                {/*<CSSTransition in={showModal} timeout={500} mountOnEnter unmountOnExit classNames={"myclass"}>*/}
                {/*    <Modal onClose={close}><PostItForm userId={props.user.userId}/></Modal>*/}
                {/*</CSSTransition>*/}

                <li onClick={setTable}>
                    <FontAwesomeIcon icon={faTable}/>
                    {addMenu.modal && addMenu.table &&
                        <Modal onClose={close}><TableForm userId={props.user.userId}/></Modal>}
                </li>

                <li onClick={setFont}>
                    <FontAwesomeIcon icon={faFont}/>
                    {addMenu.modal && addMenu.font &&
                        <Modal onClose={close}><FontSection userId={props.user.userId}/></Modal>}
                </li>

            </ul>
        </div>
    );
}

export default SideBar;
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {RootState} from "@/store/store";
import React, {useRef, useState} from "react";
import {addMenuActions} from "@/store/slices/addMenu-slice";
import {removeCookie} from "@/lib/cookie";
import {tableActions} from "@/store/slices/table-slice";
import {fontActions} from "@/store/slices/font-slice";
import {ImgActions} from "@/store/slices/img-slice";
import {canvasActions} from "@/store/slices/canvas-slice";
import {userActions} from "@/store/slices/user-slice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFont, faImage, faTable, faUser} from "@fortawesome/free-solid-svg-icons";
import styled, {keyframes} from "styled-components";
import Modal from "@/components/UI/Modal";
import Button from "@/components/UI/Button";
import FontAddForm from "@/components/Form/FontAddForm";
import TableAddForm from "@/components/Form/TableAddForm";
import ImgAddForm from "@/components/Form/ImgAddForm";

const SideBar:React.FC<{}> = () => {
    const router = useRouter();
    const userRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const addMenu = useAppSelector((state: RootState) => state.addMenu);
    const userNickName = useAppSelector((state: RootState) => state.user.userData.nick);
    const setFont = () => {dispatch(addMenuActions.setFont())}
    const setPost = () => {dispatch(addMenuActions.setImg())}
    const setTable = () => {dispatch(addMenuActions.setTable())}
    const modalClose = () => {dispatch(addMenuActions.close())}
    const mouseEnter = () => {
        userRef.current!.style.left = "70px"
        userRef.current!.style.opacity = "1"
    }
    const mouseLeave = () => {
        userRef.current!.style.left = "-200px"
        userRef.current!.style.opacity = "0"
    }
    const logOut = () => {
        removeCookie("accessToken");
        dispatch(userActions.userClear());
        // localStorage.removeItem("userId");
        router.push("/");
    }
    return(
        <SideBarWrapper>
            <ul>

                <li onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
                    <FontAwesomeIcon icon={faUser}/>
                    <UserInfoWrapper ref={userRef}>
                        <UserInfo style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            letterSpacing: "2px",
                            marginBottom: "-5px"
                        }}>{userNickName}
                        </UserInfo>
                        <UserInfo>
                            <Button onClick={logOut}>LogOut</Button>
                        </UserInfo>
                    </UserInfoWrapper>
                </li>

                <li onClick={setPost}>
                    <FontAwesomeIcon icon={faImage}/>
                    {addMenu.modal && addMenu.img &&
                        <Modal onClose={modalClose}><ImgAddForm/></Modal>}
                </li>
                {/*<CSSTransition in={showModal} timeout={500} mountOnEnter unmountOnExit classNames={"myclass"}>*/}
                {/*    <Modal onClose={close}><PostItForm userId={props.user.userId}/></Modal>*/}
                {/*</CSSTransition>*/}

                <li onClick={setTable}>
                    <FontAwesomeIcon icon={faTable}/>
                    {addMenu.modal && addMenu.table &&
                        <Modal onClose={modalClose}><TableAddForm/></Modal>}
                </li>

                <li onClick={setFont}>
                    <FontAwesomeIcon icon={faFont}/>
                    {addMenu.modal && addMenu.font &&
                        <Modal onClose={modalClose}><FontAddForm/></Modal>}
                </li>

            </ul>
        </SideBarWrapper>
    )
}
export default SideBar;
const hovering = keyframes`
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-2px, 2px);
  }
  40% {
    transform: translate(-2px, -2px);
  }
  60% {
    transform: translate(2px, 2px);
  }
  80% {
    transform: translate(2px, -2px);
  }
  100% {
    transform: translate(0);
  }
`;
const SideBarWrapper = styled.div`
  position: fixed;
  bottom: 15px;
  left: 5px;
  z-index: 10000;
  & li{
    list-style: none;
    cursor: pointer;
    width: 33px;
    height: 33px;
    border-radius: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin: 10px 10px 0px;
    padding: 0 20px;
    background-color: #EBE51E;
    color: #111;
    border: 2px solid #111;
    &:after{
      transform: translate(8px, 8px);
      transition: transform 0.4s ease-out;
      background-color: #111111;
      display: block;
      height: 30px;
      top: -2px;
      left: 0;
      width: 100%;
      position: absolute;
      border-radius: 8rem;
      content: "";
      z-index: -1;
    }
    &:active{
      background-color: #D6D01F;
      outline: 0;
    }
    &:hover{
      outline: 0;
      &:after{
        transform: translate(0, 0);
      }
    }
  }
`;
const UserInfoWrapper = styled.div`
  position: absolute;
  top: 1px;
  left: -250px;
  opacity: 0;
  padding:0.5em;
  transition: 0.5s;
  width: 200px;
  height: 100px;
  background-color: #F7F5AB;
  border-radius: 8px;
  box-sizing: border-box;
  color: #111;
  cursor: pointer;
  box-shadow: 2px 2px black;
  animation: ${hovering} 3s linear infinite both;
  &:after{
    content: '';
    position: absolute;
    left: 0;
    top: 20%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-right-color: #F7F5AB;
    border-left: 0;
    margin-top: -20px;
    margin-left: -17px;
  } &:hover{
      left: 70px;
      opacity: 1;
    }
`;
const UserInfo = styled.div`
  font-family: fantasy;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4em 0;
`;
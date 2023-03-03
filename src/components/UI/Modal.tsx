import React, {ReactNode} from "react";
import styled, {keyframes} from "styled-components";
import ReactDOM from "react-dom";

const Backdrop:React.FC<{
    onClose:()=>void
}> = (props) => {
    const onClose = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onClose();
    }
    return (
        <>
            <form onSubmit={onClose}>
                <BackDrop></BackDrop>
            </form>
        </>
    )
};

const ModalOverlay:React.FC<{
    children:ReactNode
}> = (props) => {
    return (
        <PostItModal>
            <div style={{ rotate: "-7deg" }}>{props.children}</div>
        </PostItModal>
    );
};

// const crtPortal = () => window ? document.getElementById("overlay-root")as HTMLElement : null;

const Modal:React.FC<{
    children: ReactNode
    onClose: () => void
}> = (props) => {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, document.getElementById("overlay-root")as HTMLElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, document.getElementById("overlay-root")as HTMLElement)}
        </>
    );
};

export default Modal;
const slideDown = keyframes`
  from {
    0% {
      opacity: 0;
      transform: translateY(-100%);
    }
    50% {
      opacity: 1;
      transform: translateY(90%);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
`;
const slideUp = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0.5;
    transform: translateY(-1.5rem);
  }
`;
const BackDrop = styled.button`
  position: fixed;
  top: -20px;
  left: 0;
  width: 130%;
  height: 130vh;
  z-index: 90000;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.75);
`;
const PostItModal = styled.div`
  background-image: url("/postItModal.png");
  background-size: cover;
  background-repeat: round;
  position: fixed;
  top: 10vh;
  left: 15%;
  width: 70%;
  height: 80vh;
  padding: 6em;
  z-index: 100000;
  animation: ${slideDown} 300ms ease-out forwards;
`;

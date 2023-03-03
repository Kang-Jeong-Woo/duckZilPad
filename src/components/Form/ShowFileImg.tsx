import React from "react";

const ShowFileImage:React.FC<{
    src?:string,
    alt?:string,
    onClick:()=>void
}> = (props) => {
    return(
        <div onClick={props.onClick}>
            <img src={props.src} alt={props.alt}/>
        </div>
    )
}

export default ShowFileImage;
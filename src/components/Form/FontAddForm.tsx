import React, {useEffect, useRef} from "react";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {RootState} from "@/store/store";
import {postItDataActions} from "@/store/slices/postItDataSlice";
import classes from "./Form.module.css";

const FontAddForm:React.FC = () => {
    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLInputElement>(null);
    const colorRef = useRef<HTMLInputElement>(null);
    const styleRef = useRef<HTMLSelectElement>(null);
    const userId = useAppSelector((state: RootState) => state.user.userData.userId);
    const colName = 'font'
    const addFont = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(userId) {
            if(inputRef.current?.value.trim().length !==0 && styleRef.current?.value !== ""){
                const data = {
                    content: inputRef.current!.value,
                    style: styleRef.current!.value,
                    color: colorRef.current!.value
                }
                dispatch(postItDataActions.addData({userId: userId, colName: colName, font: data}));
                return
            }
            alert("Please check the content and font style again.");
        }
    }
    return(
        <>
            <h1 className={classes.header}>Font Upload</h1>
            <form className={classes.fontForm} onSubmit={addFont}>

                <div className={classes.contentCntnr}>
                    <h2 className={classes.paragraph}><span className={classes.fontQ1}></span></h2>
                    <div className={classes.center}>
                        <input className={classes.input} type="text" id={"content"} name={"content"} ref={inputRef}/>
                    </div>
                </div>

                <div className={classes.fontCntnr}>
                    <h2 className={classes.paragraph}><span className={classes.fontQ2}></span></h2>
                    <div className={classes.center}>
                        <select className={classes.select} ref={styleRef} defaultValue={""} id={"select"}>
                            <option defaultValue={""} style={{textAlign:"center"}}>Choose the font.</option>
                            <option value={"fantasy"} style={{fontFamily:"fantasy"}}>fantasy</option>
                            <option value={"cursive"} style={{fontFamily:"cursive"}}>cursive</option>
                            <option value={"serif"} style={{fontFamily:"serif"}}>serif</option>
                            <option value={"monospace"} style={{fontFamily:"monospace"}}>monospace</option>
                        </select>
                    </div>
                </div>

                <div className={classes.colorCntnr}>
                    <h2 className={classes.paragraph}><span className={classes.fontQ3}></span></h2>
                    <div className={classes.center}>
                        <input type={"color"} id={"color"} name={"color"} ref={colorRef}/>
                    </div>
                </div>

                <div className={classes.sendCntnr}>
                    <button className={classes.button}>Send</button>
                </div>

            </form>
        </>
    )
}
export default FontAddForm;

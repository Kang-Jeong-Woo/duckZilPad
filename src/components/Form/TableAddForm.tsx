import React, {useState} from "react";
import {postItDataActions} from "@/store/slices/postItDataSlice";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {RootState} from "@/store/store";
import classes from "@/components/Form/Form.module.css";

const TableAddForm:React.FC = () => {
    const dispatch = useAppDispatch();
    const [font, setFont] = useState<string>("");
    const [bgColor, setBgColor] = useState<string>("");
    const [fontColor, setFontColor] = useState<string>("");
    const [borderColor, setBorderColor] = useState<string>("");
    const userId = useAppSelector((state: RootState) => state.user.userData.userId);
    const colName = 'table'
    const setFontFn = (event:React.ChangeEvent<HTMLSelectElement>) => {
        {setFont(event.target.value)}
    }
    const setBgColorFn = (event:React.ChangeEvent<HTMLInputElement>) => {
        {setBgColor(event.target.value)}
    }
    const setFontColorFn = (event:React.ChangeEvent<HTMLInputElement>) => {
        {setFontColor(event.target.value)}
    }
    const setBorderColorFn = (event:React.ChangeEvent<HTMLInputElement>) => {
        {setBorderColor(event.target.value)}
    }
    const addTable = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(font !== "Choose the font you want."){
            const data = {
                style: {font: font},
                color: {
                    font: fontColor,
                    border: borderColor,
                    back: bgColor
                }
            }
            dispatch(postItDataActions.addData({userId: userId!, colName: colName, table: data}));
            return
        }
        alert("Please check the content and font style again.");
    }

    return(
        <>
            <div className={classes.tableHeader}>
                <h1 className={classes.header}>Table Upload</h1>
                <div style={{display:"flex"}}>
                    <div className={classes.tableExample}>
                        example :
                    </div>
                    <table bgcolor={bgColor} style={{border:`${borderColor} 1px solid`, color:fontColor, fontFamily:font }}>
                        <tbody>
                        <tr>
                            <td>example</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <form className={classes.tableForm} onSubmit={addTable}>

                <div className={classes.fontCntnr}>
                    <h2><label htmlFor={"content"} className={classes.tableQ1}></label></h2>
                    <div className={classes.center}>
                        <select className={classes.select} defaultValue={""} style={{textAlign:"center"}} onChange={setFontFn}>
                            <option defaultValue={""} style={{textAlign:"center"}}>Choose the font you want.</option>
                            <option value={"fantasy"} style={{fontFamily:"fantasy"}}>fantasy</option>
                            <option value={"cursive"} style={{fontFamily:"cursive"}}>cursive</option>
                            <option value={"serif"} style={{fontFamily:"serif"}}>serif</option>
                            <option value={"monospace"} style={{fontFamily:"monospace"}}>monospace</option>
                        </select>
                    </div>
                </div>

                <div className={classes.fontColorCntnr}>
                    <h2><label htmlFor={"color"} className={classes.tableQ2}></label></h2>
                    <div className={classes.center}>
                        <input type={"color"} id={"color"} name={"color"} value={fontColor||"#ffffff"} onChange={setFontColorFn}/>
                    </div>
                </div>

                <div className={classes.borderColorCntnr}>
                    <h2><label htmlFor={"color"} className={classes.tableQ3}></label></h2>
                    <div className={classes.center}>
                        <input type={"color"} id={"color"} name={"color"} value={borderColor||"#ffffff"} onChange={setBorderColorFn}/>
                    </div>
                </div>

                <div className={classes.backColorCntnr}>
                    <h2><label htmlFor={"color"} className={classes.tableQ4}></label></h2>
                    <div className={classes.center}>
                        <input type={"color"} id={"color"} name={"color"} value={bgColor||"#ffffff"} onChange={setBgColorFn}/>
                    </div>
                </div>

                <div className={classes.sendCntnr}>
                    <button className={classes.button}>Send</button>
                </div >
            </form>
        </>
    )
}
export default TableAddForm;

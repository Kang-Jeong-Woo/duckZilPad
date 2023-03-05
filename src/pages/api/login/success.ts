import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import dbConnect from "@/lib/mongoose/dbConnect";
import TableData from "@/models/TableData";
import FontData from "@/models/FontData";
import DrawData from "@/models/DrawData";
import ImgData from "@/models/ImgData";
import {tableDataState} from "@/store/slices/table-slice";
import {fontDataState} from "@/store/slices/font-slice";

interface userData {
    userId: string,
    nick: string,
    role: number
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {
        
        try {
            // 토큰 데이터 검증
            const data: any = jwt.verify(req.body.accessToken, process.env.ACCESS_SECRET||"");
            await dbConnect()
            const userData: userData = await User.findOne({ userId:data.userId }).select('userId nick role')
            // 검증 성공 시 데이터 전달
            if(userData) {
                const tableData = await TableData.find({ userId:userData.userId })
                const fontData = await FontData.find({ userId:userData.userId })
                const drawData = await DrawData.find({ userId:userData.userId })
                const imgData = await ImgData.find({ userId:userData.userId })
                res.status(200).json({userData: userData, tableData: tableData, fontData: fontData, drawData: drawData, imgData: imgData});
            } else {
                res.status(500).json({ success: false, message: "Token signing failed." });
            }           
        } catch (error) {
            res.status(500).json(error);
        }

    }
}
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import dbConnect from "@/lib/mongoose/dbConnect";
import TableData from "@/models/TableData";
import FontData from "@/models/FontData";
import DrawData from "@/models/DrawData";
import PostIts from "@/models/Postits";

interface userData {
    userId: string,
    nick: string,
    roll: number
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {
        
        try {
            // 토큰 데이터 검증
            const data: any = jwt.verify(req.body.accessToken, process.env.ACCESS_SECRET||"");
        
            // 검증 성공 시 데이터 전달
            await dbConnect()
            const userData: userData = await User.findOne({ userId:data.userId }).select('userId nick roll')
            const tableData = await TableData.find({ userId:userData.userId })
            const fontData = await FontData.find({ userId:userData.userId })
            const drawData = await DrawData.find({ userId:userData.userId })
            const postIts = await PostIts.find({ userId:userData.userId })
        
            res.status(200).json({userData: userData, tableData: tableData, fontData: fontData, drawData: drawData, postIts: postIts});
            
        } catch (error) {
            res.status(500).json(error);
        }

    }
}
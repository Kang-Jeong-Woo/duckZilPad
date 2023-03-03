import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import dbConnect from "@/lib/mongoose/dbConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {
        // 용도 : accessToken을 갱신.
        try {
            // 토큰 데이터 검증
            const data: any = jwt.verify(req.body.refreshToken, process.env.REFRESH_SECRET||"");
            await dbConnect()
            const userData = await User.findOne({ userId:data.userId })

            // 검증 성공 시 accessToken 발급
            const accessToken = jwt.sign({
                userId : userData.userId,
                nick: userData.nick
            }, process.env.ACCESS_SECRET||"", {
                expiresIn : "2h",
                issuer: "SM"
            });
            
            //토큰을 담아서 Response
            res.status(200).json({ success: true, message: "Aceess Token Recreated", accessToken });
            
        } catch (error) {
            res.status(500).json(error);
        }

    }
}
import dbConnect from "@/lib/mongoose/dbConnect";
import User, { user } from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "GET") {

        try {
            // 쿼리스트링에서 usrId 데이터 확인
            const { userId } = req.query;
            await dbConnect()
             // 아이디 중복 확인
            await User.findOne({ userId: userId })
            .then((userData: user)=>{
                res.status(200).json(userData.userId)
            })
            .catch(()=>{
                res.json("")
            })
               
        } catch (error) {
            res.status(500).json(error);
        }

    }
}
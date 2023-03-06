import dbConnect from "@/lib/mongoose/dbConnect";
import User, { user } from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "GET") {

        try {
            // 타입 확인
            const { type } = req.query;
            // 쿼리스트링에서 usrId, nick 데이터 확인
            const { userId, nick } = req.query;
            if(type === 'userId') {
                await dbConnect()
                // 중복 확인
                await User.findOne({ userId: userId })
                .then((userData: user)=>{
                    res.status(200).json({userId: userData.userId})
                })
                .catch(()=>{
                    res.json({userId: ""})
                })
            } else if(type === 'nick') {
                await dbConnect()
                // 중복 확인
                await User.findOne({ nick: nick })
                .then((userData: user)=>{
                    res.status(200).json({nick: userData.nick})
                })
                .catch(()=>{
                    res.json({nick: ""})
                })
            } else if(type === 'all') { 
                await dbConnect()
                // 중복 확인
                await User.findOne({$or: [{userId: userId}, {nick: nick}]})
                .then((userData: user)=>{
                    res.status(200).json({userId: userData.userId, nick: userData.nick})
                })
                .catch(()=>{
                    res.json({userId: "", nick: ""})
                })
            }
           
               
        } catch (error) {
            res.status(500).json(error);
        }

    }
}
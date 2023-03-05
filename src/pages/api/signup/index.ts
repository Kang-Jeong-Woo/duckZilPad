import dbConnect from "@/lib/mongoose/dbConnect";
import User from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {

        try {
            // 유저 데이터 생성
            await dbConnect()
            const user = await new User(req.body);
            await user.save()
            .then(()=>{
                res.status(200).json( {success: true} )
            })
            .catch((err:any)=>{
                console.log(err)
                res.json({success: false, err})
            })
               
        } catch (error) {
            res.status(500).json(error);
        }

    }
}
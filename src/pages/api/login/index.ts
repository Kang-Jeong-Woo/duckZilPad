import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import User, { user } from "@/models/User";
import dbConnect from "@/lib/mongoose/dbConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === "POST") {

    const {userId, password} = await req.body;
    await dbConnect()
    const userInfo: user | null = await User.findOne({userId: userId, password: password})
    if (userInfo != null) {
      if (userInfo.password == password) {
        try {
          // accessToken 발급
          const accessToken = jwt.sign({
              userId : userInfo.userId,
              nick: userInfo.nick
          }, process.env.ACCESS_SECRET||"", {
              expiresIn : "2h",
              issuer: "SM"
          });

          // refreshToken 발급
          const refreshToken = jwt.sign({
              userId : userInfo.userId,
              nick: userInfo.nick
          }, process.env.REFRESH_SECRET||"", {
              expiresIn : "24h",
              issuer: "SM"
          });
          //토큰을 담아서 Response
          res.status(200).json({ success: true, accessToken, refreshToken });
        } catch (err) {
          console.log(err);
          res.status(500).json({ success: false, message: "Token signing failed." });
        }
      } else {
        res.status(403).json({ success: false, message: "Not Authorized"});
      }
    } else {
      res.status(403).json({ success: false, message: "Not Authorized" });
    }

  }

}







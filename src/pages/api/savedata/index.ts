import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import fs from "fs";
import dbConnect from "@/lib/mongoose/dbConnect";
import User, { user } from "@/models/User";
import TableData from "@/models/TableData";
import FontData from "@/models/FontData";
import DrawData from "@/models/DrawData";
import ImgData from "@/models/ImgData";
import { ObjectId } from "mongodb";
import { drawDataState, fontDataState, imgDataState, tableDataState } from "@/types/postItDataType";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {
        
        try {
            // 토큰 데이터 검증
            const data: any = jwt.verify(req.body.accessToken, process.env.ACCESS_SECRET!);
            // 검증 성공 시 데이터 저장
            const userData: user|null = await User.findOne({ userId: data.userId })
            if(userData) {
                // 바디에서 테이블, 폰트, 드로우, 이미지 데이터 확인
                await dbConnect()
                const tableData: tableDataState[] = req.body.tableData;
                const fontData: fontDataState[] = req.body.fontData;
                const imgData: imgDataState[] = req.body.imgData;
                const drawData: drawDataState = req.body.drawData;

                if(tableData.length) {
                    // 테이블 데이터 저장
                    for(let i=0; i<tableData.length; i++) {
                        // 삭제
                        if(tableData[i].isDelete) {
                            await TableData.deleteOne({ _id: new ObjectId(tableData[i]._id) })
                        // 업데이트
                        } else if(ObjectId.isValid(tableData[i]._id)) {
                            await TableData.updateOne({_id: new ObjectId(tableData[i]._id)}, {$set : tableData[i]})
                        // 신규생성
                        } else {
                            const { _id, ...others } = tableData[i]
                            const NewTableData = await new TableData(others);
                            await NewTableData.save()
                        }  
                    }
                }

                if(fontData.length) {
                    // 폰트 데이터 저장
                    for(let i=0; i<fontData.length; i++) {
                        // 삭제
                        if(fontData[i].isDelete) {
                            await FontData.deleteOne({ _id: new ObjectId(fontData[i]._id) })
                        // 업데이트
                        } else if(ObjectId.isValid(fontData[i]._id)) {
                            await FontData.updateOne({_id: new ObjectId(fontData[i]._id)}, {$set : fontData[i]})
                        // 신규생성
                        } else {
                            const { _id, ...others } = fontData[i]
                            const NewFontData = await new FontData(others);
                            await NewFontData.save()
                        }  
                    }
                }

                if(imgData.length) {
                    // 이미지 데이터 저장
                    for (let i = 0; i < imgData.length; i++) {
                        // 삭제
                        if(imgData[i].isDelete) {
                            await ImgData.deleteOne({ _id: new ObjectId(imgData[i]._id) })
                            fs.unlink("public" + imgData[i].content, (err) => {
                                if(err) {
                                    console.log(err)
                                }
                            })
                        // 업데이트
                        } else if(ObjectId.isValid(imgData[i]._id)) {
                            const { tempUrl, ...others } = imgData[i]
                            await ImgData.updateOne({_id: new ObjectId(imgData[i]._id)}, {$set : others})
                        // 신규생성
                        } else {
                            const { _id, tempUrl, ...others } = imgData[i]
                            const NewImgData = await new ImgData(others);
                            await NewImgData.save()
                        }
                    }
                }
                // 드로우 데이터 저장
                await DrawData.updateOne({userId: drawData.userId}, {$set : {userId:drawData.userId, coordinate:drawData.coordinate}}, {upsert:true})

                res.status(200).json({success: true, message: 'update success'})
            } else {
                res.status(500).json({ success: false, message: "Token signing failed." });
            }
        } catch (error) {
            res.status(500).json(error);
        }

    }
}
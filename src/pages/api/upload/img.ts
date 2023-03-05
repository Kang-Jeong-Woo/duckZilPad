import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";

// Stream 사용을 위한 bodyParser 비활성화
export const config = {
    api: {
      bodyParser: false
    }
};
  
export default async function handler( req: NextApiRequest & { files: any[] }, res: NextApiResponse ) {

    const referer: any = req.headers.referer
    // 유저 정보 찾아오는 코드
    const userId = String(referer).split("/")[3]
    // userId 경로 저장
    const path = `public/${userId}/`;
    if(!fs.existsSync(`public/${userId}`)) {
        console.log(`${userId} 폴더가 없습니다. 폴더를 생성합니다.`);
        fs.mkdirSync(`public/${userId}`); // 폴더 생성
    }
    const Form = new formidable.IncomingForm({     
        maxFileSize: 5 * 1024 * 1024,
        uploadDir: path,
        filename: function (name, ext, part, form) {
            return `${part.originalFilename}`;
        }
    })
    // formData parsing
    await new Promise((resolve, reject) => {
        Form.parse(req, (err, fields, files) => {
            if (err) {
                reject(err);
            }
            resolve(
                res.status(200).json({success:true, message: "imgupload success"})
            );
        });
    });
}

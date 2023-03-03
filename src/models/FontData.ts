import { ObjectId } from 'mongodb';
import { Model, model, models, Schema } from 'mongoose';

interface fontData {

    userId: string,
    content: string,
    pinned: boolean,
    isDelete: boolean,
    style: string,
    color: string,
    width: number,
    height: number,
    positionX: number,
    positionY: number,
    positionZ: number,
    degree: number

}

interface fontDataModel extends Model<fontData> {}

const fontDataSchema = new Schema<fontData>({

    userId: {
        type: String,
        trim: true
    },
    content: {
        type: String
    },
    pinned: {
        type: Boolean,
        default: false
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    style: {
        type: String,
        default: ""
    },
    color: {
        type: String    
    },
    width: {
        type: Number
    },
    height: {
        type: Number
    },
    positionX: {
        type: Number
    },
    positionY: {
        type: Number
    },
    positionZ: {
        type: Number
    },
    degree: {
        type: Number
    }

})

const FontData = models.FontData || model<fontData, fontDataModel>("FontData", fontDataSchema);

export default FontData;
import { Model, model, models, Schema } from 'mongoose';

interface postIts {

    userId: string,
    title: string,
    content: string,
    isDelete: boolean,
    pinned: boolean,
    style: string
    width: number,
    height: number,
    positionX: number,
    positionY: number,
    positionZ: number

}

interface postItsModel extends Model<postIts> {}

const postItsSchema = new Schema({

    userId: {
        type: String,
        trim: true
    },
    title: {
        type: String
    },
    content: {
        type: String
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    pinned: {
        type: Boolean,
        default: false
    },
    style: {
        type: String,
        default: ""
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
    }

})

const PostIts = models.PostIts || model<postIts, postItsModel>('PostIts', postItsSchema);

export default PostIts
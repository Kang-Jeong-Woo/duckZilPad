import { Model, model, models, Schema } from 'mongoose';

interface tableData {

    userId: string,
    contents: object,
    pinned: boolean,
    isDelete: boolean,
    style: object,
    color: object,
    width: number,
    height: number,
    positionX: number,
    positionY: number,
    positionZ: number,

}

interface tableDataModel extends Model<tableData> {}

const tableDataSchema = new Schema({

    userId: {
            type: String,
            trim: true
    },
    contents: {
        type: Object
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
        type: Object,
    },
    color: {
        type: Object,
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

const TableData = models.TableData || model<tableData, tableDataModel>('TableData', tableDataSchema);

export default TableData;
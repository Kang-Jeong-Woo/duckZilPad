import { Model, model, models, Schema } from 'mongoose';

interface drawData {
    userId : string,
    coordinate : string
}

interface drawDataModel extends Model<drawData> { }

const drawDataSchema = new Schema<drawData>({
    userId: {
        type: String,
        trim: true
    },
    coordinate: {
        type: String
    }
})

const DrawData = models.DrawData || model<drawData, drawDataModel>('DrawData', drawDataSchema);

export default DrawData
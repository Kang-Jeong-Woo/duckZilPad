import { Model, model, Schema, models } from 'mongoose';

export interface user {
    userId: string,
    password: string,
    nick: string,
    role: number
}

interface userModel extends Model<user> {}

const userSchema = new Schema({
    userId: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    nick: {
        type: String,
        maxlength: 10
    },
    role: {
        type: Number,
        default: 0
    }
})

const User = models.User || model<user, userModel>('User', userSchema)
export default User;
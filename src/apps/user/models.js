import Mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import { mongooseTimestamps } from '../../database'

const { Schema } = Mongoose

const UserSchema = new Schema(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, unique: true },
        password_digest: { type: String, required: true, select: false },
        country: String,
        city: String,
        address: String,
        birthday: Date,
        active: { type: Boolean, default: false },
        verfied: { type: Boolean, default: false },
    },
    {
        timestamps: mongooseTimestamps,
    }
)

UserSchema.plugin(mongoosePaginate)

export const User = Mongoose.model('User', UserSchema)

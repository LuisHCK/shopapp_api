import Mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import { mongooseTimestamps } from '../../database'

const FileSchema = Mongoose.model(
    {
        file_name: {
            type: String,
            required: true,
        },
        path: { type: String, required: true },
        user: {
            type: Mongoose.Types.ObjectId,
            required: true,
            ref: 'User'
        },
    },
    {
        timestamps: mongooseTimestamps,
    }
)

FileSchema.plugin(mongoosePaginate)

export const File = Mongoose.model('File', FileSchema)

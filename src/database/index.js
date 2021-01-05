import mongoose from 'mongoose'

const connectDb = () => {
    try {
        mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })

        const db = mongoose.connection

        db.on('error', console.error.bind(console, 'Connection error:'))

        db.once('open', () => console.debug('✅ Database connected'))
    } catch (error) {
        console.error('Mongo connection error: ', error)
    }
}

export default connectDb

export const mongooseTimestamps = {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
}

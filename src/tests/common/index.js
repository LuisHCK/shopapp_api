import mongoose from 'mongoose'

export const removeAllCollections = async () => {
    const collections = Object.keys(mongoose.connection.collections)
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName]
        await collection.deleteMany()
    }
}

export const disconnectMongoDB = () => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.disconnect()
}

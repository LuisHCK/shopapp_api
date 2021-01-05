import mongoose from 'mongoose'

const StoreSchema = mongoose.model('Store', {
    name: String,
    description: String,
})

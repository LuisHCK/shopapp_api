import mongoose from 'mongoose'

const ShopSchema = mongoose.model('Shop', {
    name: String,
    description: String,
})

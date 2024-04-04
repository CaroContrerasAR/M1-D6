import mongoose from 'mongoose'

mongoose.pluralize(null)

const collection = 'products' //debe coincidir el nombre con una collection de mongo compass o atlas

const schema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: false }, //opción type:[String]
    code: { type: String, required: true }, 
    stock: { type: Number, required: true },
    //category: { type: String, required: false },
});

export default mongoose.model(collection, schema)
import mongoose from 'mongoose'
import productsModels from '../models/products.models.js';

mongoose.pluralize(null)

const collection = 'carts' //debe coincidir el nombre con una collection de mongo compass o atlas

const schema = new mongoose.Schema({
    products:[{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'products'},
        quantity: { type: Number, require: true }
    }]
});

export default mongoose.model(collection, schema)
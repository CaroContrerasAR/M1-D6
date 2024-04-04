import mongoose from 'mongoose'

mongoose.pluralize(null)

const collection = 'messages' //debe coincidir el nombre con una collection de mongo compass o atlas

const schema = new mongoose.Schema({
    email: { type: String },
    message: { type: String },
})

export default mongoose.model(collection, schema)
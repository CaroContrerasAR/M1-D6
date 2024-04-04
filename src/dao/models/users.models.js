import mongoose from 'mongoose'

mongoose.pluralize(null)

const collection = 'users' //debe coincidir el nombre con una collection de mongo compass o atlas

const schema = new mongoose.Schema({
    first_name: { type: String, require:true },
    last_name: { type: String, require:true },
    email: { type: String, require:true },
    gender: { type: String, require:true },
});

export default mongoose.model(collection, schema)
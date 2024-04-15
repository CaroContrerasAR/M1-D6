import mongoose from 'mongoose'

const DB_URL = process.env.DB_URI || 'mongodb+srv://coderatlas:O7sKIR6KvABcVc3d@cluster0.5cwsly0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
//const DB_URL = process.env.DB_URI || 'mongodb://127.0.0.1:27017/ecommerce' //al funcionar probar con atlas

const connectDB = async() => {
    try {
        await mongoose.connect(DB_URL)
        console.log(`Conected to MongoDB`)
    } catch (err) {
        console.log(`No conected to MongoDB (${err.message})`)
    }
}

export default connectDB
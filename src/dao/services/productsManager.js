import productModel, { productModel} from '../data/products.js'

export default class ProductManager{

    constructor(){
        console.log('Trabajando con ProductManager')
    }
    getAll = async(limit)=>{
        let result = await productModel.find().limit(limit)
        return result
    }
    getById = async(id)=>{
        let result= await productModel.findById(id)
        return result
    }
    getByBrand = async(brand)=>{
        let result= await productModel.find({brand: brand})
        return result
    }
    addProduct = async(product)=>{
        let result = await porductModel.create(product)
        return result
    }
    updateProduct = async(id,productData)=>{
        let result = await porductModel.updateOne({id: id},{$set: productData})
        return result
    }
    deleteProduct = async(id)=>{
        let result = await porductModel.deleteOne({id: id})

        return result
    }
}
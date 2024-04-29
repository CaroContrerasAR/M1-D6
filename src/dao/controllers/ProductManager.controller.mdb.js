import productModel from '../models/products.models.js'

export class ProductManager {
    constructor() {
        //console.log('Constructor ProductManager')
    }
    
    async addProducts(product) {
        return await productModel.create(product)
    }

    async getProducts(limit) {
        return await productModel.find().limit(limit).lean()
    }

    async getProductsById(id){
        return await productModel.findById(id)
    }
    
    async updateProducts(id, product){
        return await productModel.findByIdAndUpdate(id, product)
    }
    
    async deleteProducts(id){
        return await productModel.findByIdAndDelete(id)
    }        
}


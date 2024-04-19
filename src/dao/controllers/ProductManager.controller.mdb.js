import productModel from '../models/products.models.js'

export class ProductManager {
    constructor() {
        //console.log('Trabajando con ProductManager MDB')
    }
    
    async addProducts(product) {
        try {
            await this.productModel.create(product)
            return 'Product Added'
        } catch (err) {
            return err.message
        }
    }

    async getProducts(limit) {
        try {   //usar lean() luego del find() para que mongoose lo convierta en Obj nativo JS
            const products = await this.productModel.find().limit(limit)
            return products
        } catch (err) {
            return err.message
        }
    }

    async getProductsById(id){
        try {
            const productById = await this.productModel.findById(id)
            return productById === null ? 'Product Not Found' : productById
        } catch (err) {
            return err.message
        }
    };
    
    async updateProducts(id, product){
        try {
            const procedure = await this.productModel.findByIdAndUpdate(id, product)
            //const procedure = await this.productModel.updateOne ({_id:id}, {$set: product})
            return procedure
        } catch (err) {
            return err.message
        }
    }
    
    async deleteProducts(id){
        try {
            const procedure = await this.productModel.findByIdAndDelete(id)
            //const procedure = await this.productModel.deleteOne({_id: id})
            return procedure
        } catch (err) {
            return err.message
        }
    }        
}


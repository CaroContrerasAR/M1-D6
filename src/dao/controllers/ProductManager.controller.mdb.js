import productModel from '../models/products.models.js'

export class ProductManager {
    constructor() {
        //console.log('Trabajando con ProductManager MDB')
    }
    
    async addProducts(product) {
        try {
            await productModel.create(product)
            return 'Product Added'
        } catch (err) {
            return err.message
        }
    }

    async getProducts() {
        try {   //usar lean() luego del find() para que mongoose lo convierta en Obj nativo JS
            const products = await productModel.find().lean()
            return products
        } catch (err) {
            return err.message
        }
    }

    async getProductsById(id){
        try {
            const productById = await productModel.findById(id)
            return productById === null ? 'Product Not Found' : productById
        } catch (err) {
            return err.message
        }
    };
    
    async updateProducts(id, product){
        try {
            const procedure = await productModel.findByIdAndUpdate(id, product)
            return procedure
        } catch (err) {
            return err.message
        }
    }
    
    async deleteProducts(id){
        try {
            const procedure = await productModel.findByIdAndDelete(id)
            return procedure
        } catch (err) {
            return err.message
        }
    }        
}

export default ProductManager
import  cartModel from '../models/carts.models.js';
import  productModel from '../models/products.models.js'

const products = new productModel

export class CartManager {
    constructor() {
        //console.log("Constructor CartManager")
    }

    async getCarts(){
        return await cartModel.find().lean()
    };
       
    async createCarts(){
        return await cartModel.create({})
    }

    async addProductInCart(cid, pid, quantity){
        const cart = await cartModel.findById(cid)
        const product = cart.products.find((product)=>product.product.toString() === pid)
        if(!cart){
            await createCarts()
        } 
        if (!product) {
            return res.status(404).json({ error: 'Product Not found'});
            }
        if (products.stock < quantity) {
            product.quantity += quantity
        } else {
            cart.products.push({product: pid, quantity})
        }
        return await cart.save()
    }

    async getCartsById(id){
        return await cartModel.findById(id);
    }
           
    async deleteProductInCart(cid, pid){
        const cart = await cartModel.findById(cid)
        const product = cart.products.findIndex((product)=>product.product.toString() === pid)
        if( product === 0 ){
            console.log('Product Not Found')
        }else {
            cart.products.splice(product,1)
        }
        return await cart.save()
    }

    async deleteCartsById(id){
        return await cartModel.findByIdAndDelete(id)
    }
}

export default CartManager
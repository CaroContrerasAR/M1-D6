import  cartModel from '../models/carts.models.js';
import  productModel from '../models/products.models.js'

//const productsAll = new  ProductManager

export class CartManager {
    constructor() {
    }

    async getCarts(){
        try {
            const cart = await this.cartModel.find().lean()
            return res.json(cart)
        } catch (err) {
            console.error('Error:', err)
            return res.status(500).json({error: "Error en la base de datos", details:err.message})
        }
    };
    
    async createCarts(){
        try {
            return await this.cartModel.create({})
        } catch (err) {
            return err.message
        }
    }

    async addProductInCart(cid, pid, qtty){
        try {
            const cart = await this.cartModel.findById(cid)
            const product = cart.products.find((product)=>product.product.toString() === pid)
            if(!cart){
                await createCarts()
                //return 'Cart Not Found'
            } 
            if (!product) {
                return res.status(404).json({ error: 'Product Not found'});
              }
            if (product.stock < qtty) {
                product.qtty += qtty
            } else {
                cart.product.push({product: pid, qtty})
            }
            return await cart.save()
        } catch (err) {
            return err.message
        }
    }

    async getCartsById(id){
        try{
            return await this.cartsModel.findById(id);
        }catch(err){
            return err.message
        }
    }
           
    async deleteProductInCart(pid, cid){
        try {
            const cart = await this.cartModel.findById(cid)
            const product = cart.products.findIndex((product)=>product.product.toString() === pid)
            if( product === 0 ){
                console.log('Product Not Found')
            }else {
                cart.product.splice(product,1)
            }
            return await cart.save()
        } catch (err) {
            return err.message
        }
    }
}
export default CartManager
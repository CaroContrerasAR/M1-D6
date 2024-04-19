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

    async addProductInCart(cartId, productId, quantity){
        try {
            const cart = await this.cartModel.findById(cartId)
            if(!cart){
                await createCarts()
                //return 'Cart Not Found'
            } 
            const product = cart.product.find((product)=>product.product.toString() === productId)
            if (!product) {
                return res.status(404).json({ error: 'Product Not found'});
              }
            if (product.stock < quantity) {
                product.quantity += quantity
            } else {
                cart.product.push({product: productId, quantity})
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
           
    async deleteCart(id){}
    
    // writeCarts= async (cart)=>{
    //     await fs.writeFile(this.path,JSON.stringify(cart))
    // }

    // exist = async(id) => {
    //     const carts = await this.readCarts()
    //     return carts.find(cart => cart.id === id)
    // }

    // addCarts = async (cartId,productId) =>{
    //     const cartsOld = await this.readCarts();
    //     const id = nanoid()
    //     const cartsConcat = [ {id : id, products : []}, ...cartsOld]
    //     await this.writeCarts(cartsConcat)
    //     return 'added Carts'
    // }

    // getCartsById = async (id) =>{
    //     const cartsById = await this.exist(id)
    //     if(!cartsById) return 'Cart Not found'
    //     return cartsById
    // };

    // addProductInCart = async (cartId, productId) => {
    //     const cartsById = await this.exist(cartId)
    //     if(!cartsById) return 'Cart Not found'
    //     const productById = await productsAll.exist(productId)
    //     if(!cartsById) return 'Product Not found'

    //     const cartAll = await this.readCarts()
    //     const cartFilter = cartAll.filter(cart => cart.id != cartId)
        
    //     if(cartsById.products.some((prod) => prod.id === productId)){
    //         const moreProductInCart = cartsById.products.find((prod) => prod.id === productId);
    //         moreProductInCart.quantity++
    //         console.log(moreProductInCart.quantity)
    //         const cartsConcat = [cartsById, ...cartFilter]
    //         await this.writeCarts(cartsConcat)
    //         return 'Addeed Product in Carts'
    //     }
    //     cartsById.products.push({ id: productById.id, quantity: 1})

    //     const cartsConcat = [cartsById, ...cartFilter]
    //     await this.writeCarts(cartsConcat)
    //     return 'Product Added to Carts'
    // }
}
export default CartManager
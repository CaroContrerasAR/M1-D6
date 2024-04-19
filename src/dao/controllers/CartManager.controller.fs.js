import { promises as fs } from 'fs';
import { nanoid } from 'nanoid';
import ProductManager from "../dao/controllers/ProductManager.controller.fs.js";

const productsAll = new  ProductManager

export class CartManager {

    constructor() {
        this.path = "./src/data/carts.json"
        //this.products = [];
    }

    readCarts= async () => {
        let carts = await fs.readFile(this.path, 'utf-8')
        return JSON.parse(carts)
    };
    
    writeCarts= async (cart)=>{
        await fs.writeFile(this.path,JSON.stringify(cart))
    }

    exist = async(id) => {
        const carts = await this.readCarts()
        return carts.find(cart => cart.id === id)
    }

    addCarts = async (cartId,productId) =>{
        const cartsOld = await this.readCarts();
        const id = nanoid()
        const cartsConcat = [ {id : id, products : []}, ...cartsOld]
        await this.writeCarts(cartsConcat)
        return 'added Carts'
    }

    getCartsById = async (id) =>{
        const cartsById = await this.exist(id)
        if(!cartsById) return 'Cart Not found'
        return cartsById
    };

    addProductInCart = async (cartId, productId) => {
        const cartsById = await this.exist(cartId)
        if(!cartsById) return 'Cart Not found'
        const productById = await productsAll.exist(productId)
        if(!productId) return 'Product Not found'

        const cartAll = await this.readCarts()
        const cartFilter = cartAll.filter(cart => cart.id != cartId)
        
        if(cartsById.products.some((prod) => prod.id === productId)){
            const moreProductInCart = cartsById.products.find((prod) => prod.id === productId);
            moreProductInCart.quantity++
            console.log(moreProductInCart.quantity)
            const cartsConcat = [cartsById, ...cartFilter]
            await this.writeCarts(cartsConcat)
            return 'Addeed Product in Carts'
        }
        cartsById.products.push({ id: productById.id, quantity: 1})

        const cartsConcat = [cartsById, ...cartFilter]
        await this.writeCarts(cartsConcat)
        return 'Product Added to Carts'
    }
}
export default CartManager
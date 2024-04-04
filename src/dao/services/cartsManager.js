//import cartsModel, { cartsModel} from '../models/carts.js'
//import productsModel, { productsModel} from '../models/products.js'

export default class CartsManager{

    constructor(){
        console.log('Trabajando con CartsManager')
    }
    getCartsById = async(id)=>{
        let result= await cartsModel.findById(id)
        return result
    }
    createCarts = async()=>{
        let result = await cartsModel.create({})
        return result
    }
    addCarts = async(cid,pid,quantity)=>{
        let cart = await cartsModel.findById(cid)
        let product = cart.product.find((product) =>product.product.toString()=== pid)
        if (product) {
            product.quantity+=quantity    
        } else {
            cart.products.push({product:pid, quantity})
        }
        return await cart.save()
    }
    deleteCarts = async(cid,pid)=>{
        let cart = await cartsModel.findById(cid)
        let product = cart.product.findIndex((product) =>product.product.toString()=== pid)
        if (product===0) {
            console.log('producto no encontrado')
        } else {
            cart.product.splice(product)
        }
        return await cart.save()
    }
}
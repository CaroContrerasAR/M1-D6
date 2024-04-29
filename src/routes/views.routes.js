import { Router } from 'express';
import { ProductManager} from '../dao/controllers/ProductManager.controller.mdb.js'
import { CartManager} from '../dao/controllers/CartManager.controller.mdb.js'

const router = Router()
const pManager = new ProductManager()
const cManager = new CartManager()

router.get('/chat', (req,res) => {
    res.render('chat',{
        title:"Chat"
    })
})

router.get('/products', async (req,res) => {
    const products = await pManager.getProducts()
    res.render('products',{ //para la vista de handlebars
        title:"Products List",
        products: products
    })
})

router.get('/carts', async (req,res) => {
    const carts = await cManager.getCarts()
    res.render('carts',{ //para la vista de handlebars
        title:"Carts List",
        carts: carts
    })
})

export default router
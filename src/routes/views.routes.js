import { Router } from 'express';
import { ProductManager} from '../dao/controllers/ProductManager.controller.mdb.js'

const router = Router()
const controller = new ProductManager()

router.get('/chat', (req,res) => {
    res.render('chat',{
        title:"Chat"
    })
})

router.get('/products', async (req,res) => {
    const products = await controller.getProducts()
    res.render('products',{ //para la vista de handlebars
        title:"Products List",
        products: products
    })
})

export default router
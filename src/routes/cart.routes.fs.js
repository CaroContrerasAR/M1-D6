import { Router } from "express";
import CartManager from '../dao/controllers/CartManager.controller.fs.js'

const router = Router()
const carts = new CartManager();

router.post('/', async (req, res) => {
    try{
        res.status(200).send(await carts.addCarts() )                
    } catch(err){
        res.status(500).send({ err: err.message })
    }
})

router.get('/', async (req, res) => {
    try {
        res.status(200).send(await carts.readCarts())
    } catch (err) {
        res.status(500).send({ err: err.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        res.status(200).send( await carts.getCartsById(req.params.id))
    } catch (err) {
        res.status(500).send({ err: err.message })
    }
})

router.post('/:cid/product/:pid', async (req, res) => {
    try{
        const cartId = req.params.cid  //parseInt(req.params.cid)
        const productId = req.params.pid  //parseInt(req.params.pid)
        res.status(200).send (await carts.addProductInCart(cartId,productId))
    } catch (err) {
        res.status(500).send({ err: err.message })
    }
})

router.put('/:pid', async(req,res) => {
    const id = req.params.pid
    const updateCart = req.body
    res.status(200).send(await product.updateCart(id, updateCart))
})

router.delete('/:pid', async(req,res) => {
    const id = req.params.pid
    res.status(200).send(await product.deleteCart(id))
})

export default router

import { Router } from "express"
import { CartManager} from '../dao/controllers/CartManager.controller.mdb.js'

const router = Router()
const controller = new CartManager()

//GET /api/carts/:cid
router.get('/', async (req, res) => {
    try {
        const cid = req.params.cid
        const carts = await controller.getCarts(cid)
        res.status(200).send({ status: 'success', data: carts })
    } catch (err) {
        res.status(500).send({ status: 'error', error: err.message })
    }
})
//POST /api/carts
router.post('/',  async (req,res) => {
    try {
        const newCart = await controller.createCarts()
        res.status(201).send({ status: "success", data: newCart })
    } catch (err) {
        res.status(500).send({ status: 'error', error: err.message })
    }
})
//POST /api/carts/:cid/product/:pid
//localhost:8080/api/carts?pid=66136d8a0bec60b4f0647758&cid=662ee93c929c3f9a5b22571
//body: quantuty=2
router.post('/:cid/product/:pid',  async (req,res) => {
    try{
        const { cid, pid } = req.params
        // const qtty = req.body.quantity; // Verifica que req.body esté definido y accede a 'quantity'
        // if (qtty === undefined) {
        //     return res.status(400).json({ error: 'Quantity is missing in request body' });
        // }
        const quantity = req.body.quantity
        const updatedCart = await controller.addProductInCart(cid, pid, quantity)
        res.status(201).send({ status: "success", data: updatedCart })
    } catch (err) {
        res.status(500).send({ status: 'error', error: err.message })
    }
})
router.put('/:pid', async (req,res) => {})

//DELETE /api/carts/:cid
router.delete('/:cid', async (req,res) => {
    const id = req.params.cid
    try {
        const procedure = await controller.deleteCartsById(id)
        res.status(200).send({status: 'success', data: null})
    } catch (err) {
        res.status(500).send({ status: 'error', error: err.message })
    }
})

export default router

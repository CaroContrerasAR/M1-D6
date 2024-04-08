import { Router } from "express";
import ProductManager from '../dao/controllers/ProductManager.controller.fs.js'

const router = Router()
//const product = new ProductManager();

// router.get('/', async(req,res) => {
//     try {
//         res.status(200).send(await product.getProducts())
//     } catch (err) {
//         res.status(500).send({ err: err.message })
//     }
// })

// router.get('/:pid', async(req,res) => {
//     try {
//         const id = req.params.pid
//         res.status(200).send(await product.getProductsById(id))
//     } catch (err) {
//         res.status(500).send({ err: err.message })
//     }
// })

// router.post("/", async(req,res) => {
//     try {
//         const newProduct = req.body
//         return res.status(200).send(await product.addProducts(newProduct))
//     } catch (err) {
//         res.status(500).send({ err: err.message })
//     }
// })

// router.put('/:pid', async(req,res) => {
//     try {
//         const id = req.params.pid
//         const updateProduct = req.body
//         res.status(200).send(await product.updateProducts(id, updateProduct))
//     } catch (err) {
//         res.status(500).send({ err: err.message })
//     }
// })

// router.delete('/:pid', async(req,res) => {
//     try {
//         const id = req.params.pid
//         res.status(200).send(await product.deleteProducts(id))
//     } catch (err) {
//         res.status(500).send({ err: err.message })
//     }
// })

export default router

import { Router } from "express"
import { uploader } from '../uploader.js'
import { ProductManager} from '../dao/controllers/ProductManager.controller.mdb.js'

const router = Router()
const controller = new ProductManager()

router.get('/', async (req,res) => {
    try {
        const products = await controller.getProducts()
        res.status(200).send({ status: 'Todo Ok', data: products })
    } catch (err) {
        res.status(500).send({ err: err.message })
    }
})

router.post('/', uploader.single('thumbnail'), async (req,res) => {
    try {
        if(!req.file)return res.status(400).send({status: 'FIL', data: 'Failed to upload file' })
        
        const { title, description, price, code, stock } = req.body
        if(!title || !description || !price || !code || !stock){
            return res.status(400).send({ status: 'ERR', data: 'All fields are required'})
        }
    
        const newContent = {
            title,
            description,
            price,
            //obj req.file dispnible con Multer como middleware
            // mediante el obj uploader
            thumbnail: req.file.filename,
            code,
            stock
        }
    
        const result = await controller.addProducts(newContent)
        res.status(200).send({ status: 'Ok', data: result })
    } catch (err) {
        res.status(500).send({ err: err.message })
    }
})

router.put('/:pid', async (req,res) => {
    try {
        const id = req.params.pid
        const updateProduct = req.body
        const procedure = await controller.updateProducts( id, updateProduct )
        res.status(200).send({status: 'Ok', data: procedure})
    } catch (err) {
        res.status(500).send({ err: err.message })
    }
})

router.delete('/:pid', async (req,res) => {
    try{
        const id = req.params.pid
        const procedure = await controller.deleteProducts(id)
        res.status(200).send({status: 'Ok', data: procedure})
    } catch(err){
        res.status(500).send({err:err.message})
    }
})

export default router

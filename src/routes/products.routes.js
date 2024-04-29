import { Router } from "express"
import { uploader } from '../uploader.js'
import { ProductManager} from '../dao/controllers/ProductManager.controller.mdb.js'

const router = Router()
const pManager = new ProductManager()

// GET /api/products
router.get('/', async (req, res) => {
    const {limit} = req.query
    try {
        const products = await pManager.getProducts(parseInt(limit))
        res.status(200).send({ status: 'success', data: products })
    } catch (err) {
        res.status(500).send({ status: 'error', error: err.message })
    }
})

// GET /api//products/:id
router.get('/:pid', async (req, res) => {
    const { pid } = req.params
    try {
        const products = await pManager.getProductsById(pid)
        if(!products) {
            return res.status(400).send({ status: 'error', error: 'Product Not Found' })
        }
        res.status(200).send({ status: 'success', data: products })            
    } catch (err) {
        console.log(err)
        res.status(500).send({ status: 'error', error: err.message })
    }
})

// POST /api/products
router.post('/', uploader.single('thumbnail'), async (req,res) => {
    try {
        if(!req.file) return res.status(400).send({ status: 'fil', data: 'Failed to upload file' })
        
        const { title, description, price, code, stock } = req.body
        if(!title || !description || !price || !code || !stock){
            return res.status(400).send({ status: 'error', error: 'All fields are required'})
        }
    
        const newProduct = {
            title,
            description,
            price,
            // el obj req.file está disponible porque estamos utilizando Multer como middleware,
            // mediante el objeto uploader que estamos importando e inyectando.
            thumbnail: req.file.filename,
            code,
            stock
        }
    
        const result = await pManager.addProducts(newProduct)
        res.status(201).send({ status: 'success', data: result })
    } catch (err) {
        res.status(500).send({ status:'error', error: err.message })
    }
})

// PUT /api/products/:pid
router.put('/:pid', async (req,res) => {
    const id = req.params.pid
    const updateProduct = req.body
    try {
        const procedure = await pManager.updateProducts( id, updateProduct )
        res.status(200).send({ status: 'success', data: procedure })
    } catch (err) {
        res.status(500).send({ status:'error',error: err.message })
    }
})

// DELETE /api/products/:pid
router.delete('/:pid', async (req, res) => {
    const id = req.params.pid
    try{
        const procedure = await pManager.deleteProducts(id)
        res.status(200).send({ status: 'success', data: null })
    } catch(err){
        res.status(500).send({ status: 'error', error: err.message })
    }
})

export default router

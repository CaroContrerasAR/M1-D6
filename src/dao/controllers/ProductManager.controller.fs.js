import { promises as fs } from 'fs';
import { nanoid } from 'nanoid';

export class ProductManager {
     
    constructor() {
        this.path = './src/data/products.json'
        this.products = [];
    }

    readProducts = async () => {
            let products = await fs.readFile(this.path, 'utf-8')
            return JSON.parse(products)
    };
       
    writeProducts= async (product)=>{
        await fs.writeFile(this.path,JSON.stringify(product))
        
    }
    
    exist = async(id) => {
        const products = await this.readProducts()
        return products.find(prod => prod.id === id)
    }

    addProducts = async (product) =>{
        if (!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category) {
                    console.log('All fields are required');
                    return;
        }
        let productsOld = await this.readProducts()
        const validateCode = productsOld.find(e => e.code === product.code);
        if (validateCode) {
            console.log(`Code ${product.code} exists`);
            return;
        }
        product.id = nanoid()
        let productAll = [...productsOld, product]
        await this.writeProducts(productAll)
        return "Producto Agregado"
    };

    getProducts = async () =>{
        return await this.readProducts()
    };

    getProductsById = async (id) =>{
        const productById = await this.exist(id)
        if(!productById) return 'Product Not found'
        return productById
    };
    
    updateProducts= async (id, product) => {
        const productById = await this.exist(id)
        if(!productById) return 'Product Not found'
        await this.deleteProducts(id)
        const productsOld = await this.readProducts()
        const products = [{...product, id: id}, ...productsOld]
        await this.writeProducts(products)
        return 'Updated product'
    }
    
    deleteProducts = async (id) => {
        const products = await this.readProducts()
        const existProducts = products.some(prod => prod.id === id)
        if (existProducts){
            const filterproducts = products.filter(prod => prod.id !== id)
            await this.writeProducts(filterproducts)
            return 'Deleted products'
        }
        return 'the product to be eliminated does not exist'
    }        
}

export default ProductManager
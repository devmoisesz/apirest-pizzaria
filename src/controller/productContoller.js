import productService from '../service/productService.js'

const CadastrarProduto = async(req, res)=>{
    try {
        const {name_product, price, description, category_id} = req.body
        //Chama o service pra fazer as verificações e retornar o produto cadastrado
        const product = await productService.CadastrarProduto(name_product, price, description, category_id)
        res.status(201).json(product)
    } catch (error) {
        res.status(400).json({mensagem: error.message})
    }
}

const LerProduto = async(req, res)=>{
    try {
        const products = await productService.LerProduto()
        res.status(200).json(products)
    } catch (error) {
        res.status(400).json({mensagem: error.message})
    }
}

export default {CadastrarProduto, LerProduto}
import productService from '../service/productService.js'

const CadastrarProduto = async(req, res)=>{
    try {
        //Pega as informações do produto direto do body
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

const LerProdutoPorId = async(req, res)=>{
    try {
        //Pega o parametro do id requisitado
        const productId = req.params.id
        //Cria uma função pro service retornar o produto requisitado
        const product = await productService.LerProdutoPorId(productId)
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({mensagem: error.message})
    }
}

const editarProduto = async(req, res)=>{
    try {
        //Pega o parametro do id requisitado
        const productId = req.params.id
        //Informções do produto vindo do body pra edição
        const {name_product, price, description, category_id} = req.body
        const upProduct = await productService.editarProduto(productId, name_product, price, description, category_id)
        res.status(200).json(upProduct)
    } catch (error) {
        res.status(400).json({mensagem: error.message})
    }
}

const deletarProduto = async(req, res)=>{
    try {
        const productId = req.params.id
        const delproduct = await productService.deletarProduto(productId)
        res.status(200).json({mensagem: 'Deletado com sucesso!'})
    } catch (error) {
        res.status(400).json({mensagem: error.message})
    }
}

export default {CadastrarProduto, LerProduto, LerProdutoPorId, editarProduto, deletarProduto}
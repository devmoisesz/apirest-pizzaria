import productService from '../service/productService.js'

const CadastrarProduto = async(req, res, next)=>{
    try {
        //Pega as informações do produto direto do body
        const {name_product, price, description, category_id} = req.body
        //Chama o service pra fazer as verificações e retornar o produto cadastrado
        const product = await productService.CadastrarProduto(name_product, price, description, category_id)
        res.status(201).json(product)
    } catch (error) {
        next(error)
    }
}

const LerProduto = async(req, res, next)=>{
    try {
        const nomeProdutoUrl = req.query.nome
        const products = await productService.LerProduto(nomeProdutoUrl)
        res.status(200).json(products)
    } catch (error) {
        next(error)
    }
}

const LerProdutoPorId = async(req, res, next)=>{
    try {
        //Pega o parametro do id requisitado
        const productId = req.params.id
        //Cria uma função pro service retornar o produto requisitado
        const product = await productService.LerProdutoPorId(productId)
        res.status(200).json(product)
    } catch (error) {
        next(error)
    }
}

const editarProduto = async(req, res, next)=>{
    try {
        //Pega o parametro do id requisitado
        const productId = req.params.id
        //Informções do produto vindo do body pra edição
        const {name_product, price, description, category_id} = req.body
        const upProduct = await productService.editarProduto(productId, name_product, price, description, category_id)
        res.status(200).json(upProduct)
    } catch (error) {
        next(error)
    }
}

const deletarProduto = async(req, res, next)=>{
    try {
        const productId = req.params.id
        const delproduct = await productService.deletarProduto(productId)
        res.status(200).json({mensagem: 'Deletado com sucesso!'})
    } catch (error) {
        next(error)
    }
}

export default {CadastrarProduto, LerProduto, LerProdutoPorId, editarProduto, deletarProduto}
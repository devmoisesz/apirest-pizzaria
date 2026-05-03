import categoryService from '../service/categoryService.js'

const criarCategoria = async(req, res) =>{
    try {
        const {nome} = req.body
        const categoria = await categoryService.postcategoria({nome})
        res.status(201).json(categoria)
    } catch (error) {
        res.status(400).json({mensagem: error.message})
    }
}

export default {criarCategoria}
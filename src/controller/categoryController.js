//Controller pega as requisições do servidor e responde
import categoryService from '../service/categoryService.js'

const criarCategoria = async(req, res) =>{
    try {
        const {nome} = req.body
        const categoria = await categoryService.postcategoria({nome})
        res.status(201).json(categoria)
    } catch (error) {
        res.status(404).json({mensagem: error.message})
    }
}

const listarCategorias = async (req, res)=>{
    try {
        const categorias = await categoryService.listar()
        res.status(200).json(categorias)
    } catch (error) {
        res.status(404).json({mensagem: error.message})
    }
}

const listarCategoriasPorId = async(req, res)=>{
    try {
        const categoriaId = req.params.id
        const categorias = await categoryService.listarPorId(categoriaId)
        res.status(200).json(categorias)
    } catch (error) {
        res.status(404).json({messagem: error.message})
    }
}

const editar = async(req, res)=>{
    try {
        const categoriaId = req.params.id
        const {nome} = req.body
        const upCategoria = await categoryService.editar(categoriaId, nome)
        res.status(200).json(upCategoria)
    } catch (error) {
        res.status(404).json({mensagem: error.message})
    }
}

const deletar = async(req, res)=>{
    try{
        const categoriaId = req.params.id
        const delcategoria = await categoryService.deletarCategoria(categoriaId)
        res.status(200).json({mensagem: "Deletado com sucesso"})
    }catch(error){
        res.status(404).json({mensagem: error.message})
    }
}

export default {criarCategoria, listarCategorias, listarCategoriasPorId, editar, deletar}
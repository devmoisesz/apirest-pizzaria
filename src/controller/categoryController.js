//Controller pega as requisições do servidor e responde
import categoryService from '../service/categoryService.js'

const criarCategoria = async(req, res, next) =>{
    try {
        const {nome} = req.body
        const categoria = await categoryService.postcategoria({nome})
        res.status(201).json(categoria)
    } catch (error) {
        next(error)
    }
}

const listarCategorias = async (req, res, next)=>{
    try {
        const categorias = await categoryService.listar()
        res.status(200).json(categorias)
    } catch (error) {
        next(error)
    }
}

const listarCategoriasPorId = async(req, res, next)=>{
    try {
        const categoriaId = req.params.id
        const categorias = await categoryService.listarPorId(categoriaId)
        res.status(200).json(categorias)
    } catch (error) {
        next(error)
    }
}

const editar = async(req, res, next)=>{
    try {
        const categoriaId = req.params.id
        const {nome} = req.body
        const upCategoria = await categoryService.editar(categoriaId, nome)
        res.status(200).json(upCategoria)
    } catch (error) {
        next(error)
    }
}

const deletar = async(req, res, next)=>{
    try{
        const categoriaId = req.params.id
        const delcategoria = await categoryService.deletarCategoria(categoriaId)
        res.status(200).json({mensagem: "Deletado com sucesso"})
    }catch(error){
        next(error)
    }
}

async function ProdutoDaCategoria(req, res, next) {
    try {
        const id = req.params.id
        const ProdutoDaCategoria = await categoryService.ProdutoDaCategoria(id)
        res.status(200).json(ProdutoDaCategoria)
    } catch (error) {
        next(error)
    }
}

export default {criarCategoria, listarCategorias, listarCategoriasPorId, editar, deletar, ProdutoDaCategoria}
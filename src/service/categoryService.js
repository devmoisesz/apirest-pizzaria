//Service faz as verificações pra retornar pro controller
import categoryRepository from '../repository/categoryRepository.js'

const postcategoria = async({nome}) =>{
    //Verifica se já tem alguma categoria com mesmo nome
    const jaExiste = await categoryRepository.buscarPorNome(nome)
        if(jaExiste) {
            const error = new Error('Categoria já cadastrada!')
            error.status = 400
            throw error
        }
    //Retorna a categoria cadastrada
    return categoryRepository.criar(nome)
}

const listar = async()=>{
    //Retorna pro controller as lista de categoria do banco
    return categoryRepository.listar()
}

const listarPorId = async(id)=>{
    const categoria = await categoryRepository.listarPorId(id)
    if(!categoria) {
        const error = new Error('Categoria não encontrada!')
        error.status = 404
        throw error
    }
    return categoria
}

const editar = async(id, up)=>{
    const upCategoria = await categoryRepository.editar(id, up)
    if(!upCategoria) {
        const error = new Error('Categoria não encontrada!')
        error.status = 404
        throw error
    } 
    return upCategoria
}

const deletarCategoria = async(id)=>{
    const categoria = await categoryRepository.listarPorId(id)
    if(!categoria) {
        const error = new Error('Categoria não encontrada!')
        error.status = 404
        throw error
    }
    return categoryRepository.deletarCategoria(id)
}

async function ProdutoDaCategoria(id) {
    const idcategoria = await categoryRepository.SelectId(id)
        if(!idcategoria) {
            const error = new Error('Categoria não encontrada!')
            error.status = 404
            throw error
        }
    const categoria = await categoryRepository.ProdutoDaCategoria(id)
    if(!categoria || categoria.length === 0) {
        const error = new Error('Categoria não encontrada!')
        error.status = 404
        throw error
    }
    return categoria
}

export default {postcategoria, listar, listarPorId, editar, deletarCategoria, ProdutoDaCategoria}
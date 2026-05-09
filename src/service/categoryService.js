//Service faz as verificações pra retornar pro controller
import categoryRepository from '../repository/categoryRepository.js'

const postcategoria = async({nome}) =>{
    //Verifica se já tem alguma categoria com mesmo nome
    const jaExiste = await categoryRepository.buscarPorNome(nome)
    if(jaExiste) throw new Error('Categoria já cadastrada')
    //Retorna a categoria cadastrada
    return categoryRepository.criar(nome)
}

const listar = async()=>{
    //Retorna pro controller as lista de categoria do banco
    return categoryRepository.listar()
}

const listarPorId = async(id)=>{
    const categoria = await categoryRepository.listarPorId(id)
    if(!categoria) throw new Error("Categoria não encontrada")
    return categoria
}

const editar = async(id, up)=>{
    const upCategoria = await categoryRepository.editar(id, up)
    if(!upCategoria) throw new Error("Categoria não encontrada") 
    return upCategoria
}

const deletarCategoria = async(id)=>{
    const categoria = await categoryRepository.listarPorId(id)
    if(!categoria) throw new Error("Categoria não encontrada")
    return categoryRepository.deletarCategoria(id)
}

async function ProdutoDaCategoria(id) {
    const idcategoria = await categoryRepository.SelectId(id)
    if(!idcategoria) throw new Error("Categoria não encontrada")
    const categoria = await categoryRepository.ProdutoDaCategoria(id)
    if(!categoria || categoria.length === 0) throw new Error("Categoria sem produto cadastrado!")
    return categoria
}

export default {postcategoria, listar, listarPorId, editar, deletarCategoria, ProdutoDaCategoria}
import categoryRepository from '../repository/categoryRepository.js'

const postcategoria = async({nome}) =>{
    const jaExiste = await categoryRepository.buscarPorNome(nome)
    if(jaExiste) throw new Error('Categoria já cadastrada')
    return categoryRepository.criar(nome)
}

const listar = async()=>{
    return categoryRepository.listar()
}

const listarPorId = async(id)=>{
    const categoria = await categoryRepository.listarPorId(id)
    if(!categoria){
        throw new Error("Categoria não encontrada")
    }
    return categoria
}

const editar = async(id, up)=>{
    const upCategoria = await categoryRepository.editar(id, up)
    if(!upCategoria){
        throw new Error("Categoria não encontrada") 
    }
    return upCategoria
}

const deletarCategoria = async(id)=>{
    const categoria = await categoryRepository.listarPorId(id)
    if(!categoria){
        throw new Error("Categoria não encontrada")
    }
    return categoryRepository.deletarCategoria(id)
}

export default {postcategoria, listar, listarPorId, editar, deletarCategoria}
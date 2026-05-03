import categoryRepository from '../repository/categoryRepository.js'

const postcategoria = async({nome}) =>{
    const jaExiste = await categoryRepository.buscarPorNome(nome)
    if(jaExiste) throw new Error('Categoria já cadastrada')
    return categoryRepository.criar({nome})
}

export default {postcategoria}
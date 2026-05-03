import productRepository from '../repository/productRepository.js'
import categoryRepository from '../repository/categoryRepository.js'

const CadastrarProduto = async(name_product, price, description, category_id)=>{
    //Fazer uma query no banco pra verificações
    const jaExiste = await productRepository.buscarPorNome(name_product) //Busca no banco se já existe produto com mesmo nome
    const idcategoria = await categoryRepository.listarPorId(category_id) //Busca na tabela de categoria o id pra verificar id existente
    if(!idcategoria) throw new Error("Categoria não encontrada!")
    if(jaExiste) throw new Error("Produto já cadastrado!")
    return productRepository.cadastrar(name_product, price, description, category_id)
}

const LerProduto = async()=>{
    const products = await productRepository.Listar()
    return products
}

const LerProdutoPorId = async(id)=>{
    const product = await productRepository.productPorId(id)
    if(!product) throw new Error("Produto não encontrado!")
    return(product)
}

const editarProduto = async(id, name_product, price, description, category_id)=>{
    //Verificar se o id requisitado existe
    const idproduct = await productRepository.verificar(id)
    if(!idproduct) throw new Error("Produto não encontrado!")
    //Busca na tabela categoria o id pra verificar se o id requisitado existe
    const idcategoria = await categoryRepository.listarPorId(category_id) 
    if(!idcategoria) throw new Error("Categoria não encontrada1")
    return productRepository.editarProduto(id, name_product, price, description, category_id)
}

const deletarProduto = async(id)=>{
    //Verificar se o id requisitado existe
    const idproduct = await productRepository.verificar(id)
    if(!idproduct) throw new Error("Produto não encontrado!")
    return productRepository.deletarProduto(id)
}

export default {CadastrarProduto, LerProduto, LerProdutoPorId, editarProduto, deletarProduto}
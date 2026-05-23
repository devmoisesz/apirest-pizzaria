import productRepository from '../repository/productRepository.js'
import categoryRepository from '../repository/categoryRepository.js'

const CadastrarProduto = async(name_product, price, description, category_id)=>{
    //Fazer uma query no banco pra verificações
    const jaExiste = await productRepository.buscarPorNome(name_product) //Busca no banco se já existe produto com mesmo nome
    const idcategoria = await categoryRepository.listarPorId(category_id) //Busca na tabela categoria o id da categoria do produto pra verificar se a categoria existe
   //Verificações
    if(!idcategoria) {
        const error = new Error('Categoria não encontrada!')
        error.status = 404
        throw error
    }
    if(jaExiste) {
        const error = new Error('Produto já cadastrado!')
        error.status = 400
        throw error
    }
    //Retorna pro controller responder o produto cadastrado
    return productRepository.cadastrar(name_product, price, description, category_id)
}

const LerProduto = async(nomeProdutoUrl)=>{
    //Verifica se requisitaram nome de produto na url pra filtragem
    if(nomeProdutoUrl){
        //Se requisitaram consulta o banco pra Listar com filtragem
        return await productRepository.ListarProdutoFiltrado(nomeProdutoUrl)
    }
    //Se não Lista todos produtos
    const products = await productRepository.Listar()
    return products
}

const LerProdutoPorId = async(id)=>{
    //Função pro repository retornar apenas o produto requisitado
    const product = await productRepository.productPorId(id)
    //Se o produto não for encontrado
    if(!product) {
        const error = new Error('Produto não encontrado!')
        error.status = 404
        throw error
    }
    return(product)
}

const editarProduto = async(id, name_product, price, description, category_id)=>{
    //Verificar se o id requisitado existe
    const idproduct = await productRepository.productPorId(id)
    if(!idproduct) {
        const error = new Error('Produto não encontrado!')
        error.status = 404
        throw error
    }
    //Busca na tabela categoria o id da categoria do produto pra verificar se a categoria existe
    const idcategoria = await categoryRepository.listarPorId(category_id) 
    if(!idcategoria) {
        const error = new Error('Categoria não encontrada!')
        error.status = 404
        throw error
    }
    //Retorna o produto editado
    return productRepository.editarProduto(id, name_product, price, description, category_id)
}

const deletarProduto = async(id)=>{
    //Verificar se o id requisitado existe
    const idproduct = await productRepository.productPorId(id)
    if(!idproduct) {
        const error = new Error('Produto não encontrado!')
        error.status = 404
        throw error
    }
    return productRepository.deletarProduto(id)
}

export default {CadastrarProduto, LerProduto, LerProdutoPorId, editarProduto, deletarProduto}
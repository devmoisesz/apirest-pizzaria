import pedidosRepository from '../repository/pedidosRepository.js'

async function Criarpedido(user_id, endereco_id, itens) {
    const usuario = await pedidosRepository.verificaUsuario(user_id)
    if(!usuario) throw new Error("Usuário não encontrado!")
    const endereco = await pedidosRepository.verificaEndereco(endereco_id)
    if(!endereco) throw new Error("Endereço não encontrado!")

    await Promise.all(itens.map(async (item) => {
            const produto = await pedidosRepository.verificarProduto(item.product_id)
            if(!produto) throw new Error("Produto não Encontrado!");
            item.unit_price = produto.price //Adiciona o preço no item
        }))

    return await pedidosRepository.Criarpedido(user_id, endereco_id, itens)
}

export default {Criarpedido}
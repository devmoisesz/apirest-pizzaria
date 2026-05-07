import pedidosRepository from '../repository/pedidosRepository.js'

async function Criarpedido(user_id, endereco_id, itens) {
    const usuario = await pedidosRepository.buscaUsuario(user_id)
    if(!usuario) throw new Error("Usuário não encontrado!")
    const endereco = await pedidosRepository.buscaEndereco(endereco_id)
    if(!endereco) throw new Error("Endereço não encontrado!")

    await Promise.all(itens.map(async (item) => {
            const produto = await pedidosRepository.buscaProduto(item.product_id)
            if(!produto) throw new Error("Produto não Encontrado!")
            item.unit_price = produto.price //Adiciona o preço no item
        }))

    return await pedidosRepository.Criarpedido(user_id, endereco_id, itens)
}

async function listarPedidos() {
    return await pedidosRepository.BuscarPedidos()
}

async function listarPorId(id) {
    const idpedido = await pedidosRepository.buscarId(id)
    if(!idpedido) throw new Error("Pedido não encontrado")
    return await pedidosRepository.buscarPedido(id)
}

async function EditarPedido(id, status) {
    const idpedido = await pedidosRepository.buscarId(id)
    if(!idpedido) throw new Error("Pedido não encontrado")
    return await pedidosRepository.EditarPedido(id, status)
}

async function DeletarProduto(id) {
    const idpedido = await pedidosRepository.buscarId(id)
    if(!idpedido) throw new Error("Pedido não encontrado!")
    return await pedidosRepository.DeletarProduto(id)
}

export default {Criarpedido, listarPedidos, listarPorId, EditarPedido, DeletarProduto}
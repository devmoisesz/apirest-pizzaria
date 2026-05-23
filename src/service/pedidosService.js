import pedidosRepository from '../repository/pedidosRepository.js'

async function Criarpedido(user_id, endereco_id, itens) {
    const endereco = await pedidosRepository.buscaEndereco(endereco_id)
    if(!endereco) throw new Error("Endereço não encontrado!")

    await Promise.all(itens.map(async (item) => {
            const produto = await pedidosRepository.buscaProduto(item.product_id)
            if(!produto) throw new Error("Produto não Encontrado!")
            item.unit_price = produto.price //Adiciona o preço no item
        }))

    return await pedidosRepository.Criarpedido(user_id, endereco_id, itens)
}

async function ListarHistorico(idCliente) {
    const pedidosHistorico = await pedidosRepository.ListarHistorico(idCliente)
    if(pedidosHistorico.length === 0) return []
    return pedidosHistorico
}

async function listarPedidoCliente(idCliente, idPedido) {
    // valida se o pedido existe
    const id_pedido = await pedidosRepository.buscarId(idPedido)
    if(!id_pedido) throw new Error("Pedido não encontrado")

    // valida se o pedido pertence ao cliente
    const pedido = await pedidosRepository.listarPedidoCliente(idCliente, idPedido)
    if(!pedido) throw new Error("Pedido não encontrado")

    return pedido
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

async function ClienteCancelarPedido(id_user, idPedido) {
    //Busca pedido de acordo com id do usuario e o id requisitado na url
    const pedido = await pedidosRepository.BuscarPedidoPorUsuario(id_user, idPedido)

    //Verificar se o pedido requisitado existe
    if(!pedido) throw new Error("Pedido não encontrado!")
    //Verificar se o pedido está pendente
    if(pedido.status !== 'pendente') throw new Error("Não é possível cancelar um pedido que não esteja pendente.");

    return await pedidosRepository.ClienteCancelarPedido(id_user, idPedido)
}

async function DeletarPedido(id) {
    const idpedido = await pedidosRepository.buscarId(id)
    if(!idpedido) throw new Error("Pedido não encontrado!")
    const statusCancelamento = await pedidosRepository.statusPendente(id)
    if(statusCancelamento.status !== "pendente") throw new Error("Não é possível cancelar um pedido que não esteja pendente.")
    return await pedidosRepository.DeletarPedido(id)
}

export default {Criarpedido, ListarHistorico, listarPedidoCliente, listarPedidos, listarPorId, EditarPedido, ClienteCancelarPedido, DeletarPedido}
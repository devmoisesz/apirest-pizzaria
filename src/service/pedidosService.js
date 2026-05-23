import pedidosRepository from '../repository/pedidosRepository.js'

async function Criarpedido(user_id, endereco_id, itens) {
    const endereco = await pedidosRepository.buscaEndereco(endereco_id)
    if(!endereco) {
        const error = new Error('Endereço não encontrado!')
        error.status = 404
        throw error
    }

    await Promise.all(itens.map(async (item) => {
            const produto = await pedidosRepository.buscaProduto(item.product_id)
            if(!produto) {
                const error = new Error('Produto não encontrado!')
                error.status = 404
                throw error
            }
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
    if(!id_pedido) {
        const error = new Error('Pedido não encontrado!')
        error.status = 404
        throw error
    }

    // valida se o pedido pertence ao cliente
    const pedido = await pedidosRepository.listarPedidoCliente(idCliente, idPedido)
    if(!pedido) {
        const error = new Error('Pedido não encontrado!')
        error.status = 404
        throw error
    }

    return pedido
}


async function listarPedidos() {
    return await pedidosRepository.BuscarPedidos()
}

async function listarPorId(id) {
    const idpedido = await pedidosRepository.buscarId(id)
    if(!idpedido) {
        const error = new Error('Pedido não encontrado!')
        error.status = 404
        throw error
    }
    return await pedidosRepository.buscarPedido(id)
}

async function EditarPedido(id, status) {
    const idpedido = await pedidosRepository.buscarId(id)
    if(!idpedido) {
        const error = new Error('Pedido não encontrado!')
        error.status = 404
        throw error
    }
    return await pedidosRepository.EditarPedido(id, status)
}

async function ClienteCancelarPedido(id_user, idPedido) {
    //Busca pedido de acordo com id do usuario e o id requisitado na url
    const pedido = await pedidosRepository.BuscarPedidoPorUsuario(id_user, idPedido)

    //Verificar se o pedido requisitado existe
    if(!pedido) {
        const error = new Error('Pedido não encontrado!')
        error.status = 404
        throw error
    }
    //Verificar se o pedido está pendente
    if(pedido.status !== 'pendente') {
        const error = new Error('Não é possível cancelar um pedido que não esteja pendente.')
        error.status = 409
        throw error
    }

    return await pedidosRepository.ClienteCancelarPedido(id_user, idPedido)
}

async function DeletarPedido(id) {
    const idpedido = await pedidosRepository.buscarId(id)
    if(!idpedido) {
        const error = new Error('Pedido não encontrado!')
        error.status = 404
        throw error
    }
    const statusCancelamento = await pedidosRepository.statusPendente(id)
    if(statusCancelamento.status === 'cancelado'){
        const error = new Error('Pedido já cancelado!')
        error.status = 409
        throw error
    }
    if(statusCancelamento.status !== "pendente") {
        const error = new Error('Não é possível cancelar um pedido que não esteja pendente.')
        error.status = 409
        throw error
    }
    return await pedidosRepository.DeletarPedido(id)
}

export default {Criarpedido, ListarHistorico, listarPedidoCliente, listarPedidos, listarPorId, EditarPedido, ClienteCancelarPedido, DeletarPedido}
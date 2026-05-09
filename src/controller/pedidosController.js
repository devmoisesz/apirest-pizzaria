import pedidosService from '../service/pedidosService.js'

async function Criarpedido(req, res, next) {
    try {
        const {user_id, endereco_id, itens} = req.body 
        const pedido = await pedidosService.Criarpedido(user_id, endereco_id, itens)
        res.status(201).json(pedido)
    } catch (error) {
        next(error)
    }
}

async function listarPedidos(req, res, next) {
        try {
            const pedidos = await pedidosService.listarPedidos()
            res.status(200).json(pedidos)
        } catch (error) {
            next(error)
        }
}

async function listarPedidosPorId(req, res, next) {
    try {
        const id = req.params.id
        const pedido = await pedidosService.listarPorId(id)
        res.status(200).json(pedido) 
    } catch (error) {
        next(error)
    }
}

async function EditarPedido(req, res, next) {
    try {
        const id = req.params.id
        const {status} = req.body
        const pedidoEditado = await pedidosService.EditarPedido(id, status)
        res.status(200).json(pedidoEditado)
    } catch (error) {
        next(error)
    }
}

async function DeletarProduto(req, res, next) {
    try {
        const id = req.params.id
        const produtoDeletado = await pedidosService.DeletarProduto(id)
        res.status(200).json({mensagem: 'Deletado!'})
    } catch (error) {
        next(error)
    }
}

export default {Criarpedido, listarPedidos, listarPedidosPorId, EditarPedido, DeletarProduto}
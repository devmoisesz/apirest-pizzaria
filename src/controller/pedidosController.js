import pedidosService from '../service/pedidosService.js'

async function Criarpedido(req, res) {
    try {
        const {user_id, endereco_id, itens} = req.body 
        const pedido = await pedidosService.Criarpedido(user_id, endereco_id, itens)
        res.status(201).json(pedido)
    } catch (error) {
        res.status(404).json({mensagem: error.message})
    }
}

async function listarPedidos(req, res) {
        try {
            const pedidos = await pedidosService.listarPedidos()
            res.status(200).json(pedidos)
        } catch (error) {
            res.status(404).json({mensagem: error.message})
        }
}

async function listarPedidosPorId(req, res) {
    try {
        const id = req.params.id
        const pedido = await pedidosService.listarPorId(id)
        res.status(200).json(pedido) 
    } catch (error) {
        res.status(404).json({mensagem: error.message})
    }
}

async function EditarPedido(req, res) {
    try {
        const id = req.params.id
        const {status} = req.body
        const pedidoEditado = await pedidosService.EditarPedido(id, status)
        res.status(200).json(pedidoEditado)
    } catch (error) {
        res.status(404).json({mensagem: error.message})
    }
}

async function DeletarProduto(req, res) {
    try {
        const id = req.params.id
        const produtoDeletado = await pedidosService.DeletarProduto(id)
        res.status(200).json({mensagem: 'Deletado!'})
    } catch (error) {
        res.status(404).json({mensagem: error.message})
    }
}

export default {Criarpedido, listarPedidos, listarPedidosPorId, EditarPedido, DeletarProduto}
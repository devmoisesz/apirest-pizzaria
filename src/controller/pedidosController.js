import pedidosService from '../service/pedidosService.js'

async function Criarpedido(req, res) {
    try {
        const {user_id, endereco_id, itens} = req.body 
        const pedido = await pedidosService.Criarpedido(user_id, endereco_id, itens)
        res.status(201).json(pedido)
    } catch (error) {
        res.status(400).json({mensagem: error.message})
    }
}

async function listarPedidos(req, res) {
        try {
            const pedidos = await pedidosService.listarPedidos()
            res.status(200).json(pedidos)
        } catch (error) {
            res.status(400).json({mensagem: error.message})
        }
}

export default {Criarpedido, listarPedidos}
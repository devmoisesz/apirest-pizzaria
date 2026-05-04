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

export default {Criarpedido}
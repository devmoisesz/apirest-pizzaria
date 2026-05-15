import { Router } from "express";
import pedidosController from '../controller/pedidosController.js'
import pedidosMiddleware from '../middlewares/pedidosMiddleware.js'
import authMiddleware from "../middlewares/authMiddleware.js"
import adminMiddleware from '../middlewares/adminMiddleware.js'

const router = Router()

//Rota pra criar um pedido para o usuário autenticado
router.post('/', authMiddleware.autenticarToken, 
    pedidosMiddleware.ValidarCadastro, 
    pedidosController.Criarpedido
) 

//Rota pra listar todos pedidos cadastrados(Apenas Admin tem acesso)
router.get('/', authMiddleware.autenticarToken, 
    adminMiddleware.apenasAdmin,
    pedidosController.listarPedidos) 

//Rota pra listar o histórico de pedidos(entregue ou cancelado) do cliente
router.get('/historico', authMiddleware.autenticarToken,
    pedidosController.ListarHistorico
)

//Rota pro cliente ler seu próprio pedido
router.get('/perfil/:id', authMiddleware.autenticarToken,
    pedidosController.listarPedidoCliente,
)

//Rota pra listar apenas o pedido requisitado pelo id(Apenas Admin tem acesso)
router.get('/:id', authMiddleware.autenticarToken, 
    adminMiddleware.apenasAdmin,
    pedidosController.listarPedidosPorId) 

//Rota pra editar apenas o pedido requisitado pelo id(Apenas Admin tem acesso)
router.put('/:id', authMiddleware.autenticarToken, 
    adminMiddleware.apenasAdmin,
    pedidosMiddleware.ValidarEdicaoDePedido,
    pedidosController.EditarPedido) 

//Rota pro cliente conseguir cancelar o próprio pedido
router.delete('/perfil/:id',
    authMiddleware.autenticarToken, 
    pedidosController.ClienteCancelarPedido)

//Rota pra deletar apenas o pedido requisitado pelo id(Apenas Admin tem acesso)
router.delete('/:id', authMiddleware.autenticarToken, 
    adminMiddleware.apenasAdmin, 
    pedidosController.DeletarPedido) 

export default router
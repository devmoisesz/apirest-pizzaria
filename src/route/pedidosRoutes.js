import { Router } from "express";
import pedidosController from '../controller/pedidosController.js'
import pedidosMiddleware from '../middlewares/pedidosMiddleware.js'
import authMiddleware from "../middlewares/authMiddleware.js"
import adminMiddleware from '../middlewares/adminMiddleware.js'

const router = Router()

//Rota pra validar e cadastrar pedidos
router.post('/', authMiddleware.autenticarToken, 
    pedidosMiddleware.ValidarCadastro, 
    pedidosController.Criarpedido) 

//Rota pra listar todos pedidos cadastrados(Apenas Admin tem acesso)
router.get('/', authMiddleware.autenticarToken, 
    adminMiddleware.apenasAdmin,
    pedidosController.listarPedidos) 

//Rota pra listar apenas o pedido requisitado pelo id(Apenas Admin tem acesso)
router.get('/:id', authMiddleware.autenticarToken, 
    adminMiddleware.apenasAdmin,
    pedidosController.listarPedidosPorId) 

//Rota pra editar apenas o pedido requisitado pelo id(Apenas Admin tem acesso)
router.put('/:id', authMiddleware.autenticarToken, 
    adminMiddleware.apenasAdmin,
    pedidosMiddleware.ValidarEdiçãoDePedido,
    pedidosController.EditarPedido) 

//Rota pra deletar apenas o pedido requisitado pelo id(Apenas Admin tem acesso)
router.delete('/:id', authMiddleware.autenticarToken, 
    adminMiddleware.apenasAdmin, 
    pedidosController.DeletarPedido) 

export default router
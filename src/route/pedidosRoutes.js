import { Router } from "express";
import pedidosController from '../controller/pedidosController.js'
import pedidosMiddleware from '../middlewares/pedidosMiddleware.js'
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router()

router.post('/', pedidosMiddleware.ValidarCadastro, pedidosController.Criarpedido) //Rota pra validar e cadastrar pedidos

router.get('/', authMiddleware.autenticarToken, authMiddleware.autenticarToken, pedidosController.listarPedidos) //Rota pra listar todos pedidos cadastrados

router.get('/:id', authMiddleware.autenticarToken, pedidosController.listarPedidosPorId) //Rota pra listar apenas o pedido requisitado pelo id

router.put('/:id', authMiddleware.autenticarToken, pedidosController.EditarPedido) //Rota pra editar apenas o pedido requisitado pelo id

router.delete('/:id', authMiddleware.autenticarToken, pedidosController.DeletarPedido) //Rota pra deletar apenas o pedido requisitado pelo id

export default router
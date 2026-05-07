import { Router } from "express";
import pedidosController from '../controller/pedidosController.js'

const router = Router()

router.post('/', pedidosController.Criarpedido)

router.get('/', pedidosController.listarPedidos)

router.get('/:id', pedidosController.listarPedidosPorId)

router.put('/:id', pedidosController.EditarPedido)

export default router
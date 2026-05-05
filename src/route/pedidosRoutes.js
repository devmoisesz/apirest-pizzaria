import { Router } from "express";
import pedidosController from '../controller/pedidosController.js'

const router = Router()

router.post('/', pedidosController.Criarpedido)

router.get('/', pedidosController.listarPedidos)

export default router
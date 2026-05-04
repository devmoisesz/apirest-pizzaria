import { Router } from "express";
import pedidosController from '../controller/pedidosController.js'

const router = Router()

router.post('/', pedidosController.Criarpedido)

export default router
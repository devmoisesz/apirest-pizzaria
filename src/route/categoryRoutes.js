import { Router } from "express";
import categoryController from '../controller/categoryController.js'

const router = Router()

router.post('/', categoryController.criarCategoria)

export default router
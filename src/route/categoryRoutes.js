import { Router } from "express";
import categoryController from '../controller/categoryController.js'

const router = Router()

router.post('/', categoryController.criarCategoria)

router.get('/', categoryController.listarCategorias)

router.get('/:id', categoryController.listarCategoriasPorId)

router.put('/:id', categoryController.editar)

router.delete('/:id', categoryController.deletar)

export default router
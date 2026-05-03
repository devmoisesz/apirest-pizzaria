import { Router } from 'express'
import productController from '../controller/productContoller.js'

const router = Router()

router.post('/', productController.CadastrarProduto)

router.get('/', productController.LerProduto)

router.get('/:id', productController.LerProdutoPorId)

router.put('/:id', productController.editarProduto)

router.delete('/:id', productController.deletarProduto)

export default router
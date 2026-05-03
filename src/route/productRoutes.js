import { Router } from 'express'
import productController from '../controller/productContoller.js'

const router = Router()

router.post('/', productController.CadastrarProduto)

router.get('/', productController.LerProduto)

router.get('/:id', productController.LerProdutoPorId)

export default router
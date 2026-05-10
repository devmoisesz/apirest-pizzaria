import { Router } from 'express'
import productController from '../controller/productController.js'
import productMiddleware from '../middlewares/productMiddleware.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = Router()

router.post('/', authMiddleware.autenticarToken, productMiddleware.ValidarCadastro, productController.CadastrarProduto) //Rota pra validar e cadastrar produtos

router.get('/', productController.LerProduto) //Rota pra listar todos produtos cadastrados

router.get('/:id', productController.LerProdutoPorId) //Rota pra ler apenas produto requisitado pelo id

router.put('/:id', authMiddleware.autenticarToken, productController.editarProduto) //Rota pra editar produto requisitado pelo id

router.delete('/:id', authMiddleware.autenticarToken, productController.deletarProduto) //Rota pra deletar produto requisitado pelo id

export default router
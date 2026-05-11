import { Router } from 'express'
import productController from '../controller/productController.js'
import productMiddleware from '../middlewares/productMiddleware.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import adminMiddleware from '../middlewares/adminMiddleware.js'

const router = Router()

//Rota pra validar e cadastrar produtos(Apenas Admin tem acesso)
router.post('/', authMiddleware.autenticarToken,
    adminMiddleware.apenasAdmin, 
    productMiddleware.ValidarCadastro, 
    productController.CadastrarProduto
    ) 

//Rota pra listar todos produtos cadastrados
router.get('/', productController.LerProduto) 

//Rota pra ler apenas produto requisitado pelo id
router.get('/:id', productController.LerProdutoPorId) 

//Rota pra editar produto requisitado pelo id(Apenas Admin tem acesso)
router.put('/:id', authMiddleware.autenticarToken,
    adminMiddleware.apenasAdmin, 
    productMiddleware.ValidarCadastro, 
    productController.editarProduto
    ) 

//Rota pra deletar produto requisitado pelo id(Apenas Admin tem acesso)
router.delete('/:id', authMiddleware.autenticarToken, adminMiddleware.apenasAdmin, 
    productController.deletarProduto
    )


export default router
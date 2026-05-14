import { Router } from "express";
import categoryController from '../controller/categoryController.js'
import categoryMiddleware from '../middlewares/categoryMiddleware.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import adminMiddleware from '../middlewares/adminMiddleware.js'

const router = Router()

//Rota pra validar e cadastro de categorias(Apenas Admin tem acesso)
router.post('/', authMiddleware.autenticarToken, 
    adminMiddleware.apenasAdmin, 
    categoryMiddleware.VerificarCadastro, 
    categoryController.criarCategoria) 

//Rota pra ler todas categorias cadastradas
router.get('/', categoryController.listarCategorias) 

//Rota pra ler apenas categoria requisitada pelo id
router.get('/:id', categoryController.listarCategoriasPorId) 

//Rota pra ler os produtos da categoria
router.get('/:id/produtos', categoryController.ProdutoDaCategoria) 

// Rota pra editar categoria (Apenas Admin tem acesso)
router.put('/:id', authMiddleware.autenticarToken, 
    adminMiddleware.apenasAdmin, 
    categoryMiddleware.VerificarCadastro, 
    categoryController.editar) 

//Rota pra deletar categorias(Apenas Admin tem acesso)
router.delete('/:id', authMiddleware.autenticarToken, adminMiddleware.apenasAdmin, categoryController.deletar) 

export default router
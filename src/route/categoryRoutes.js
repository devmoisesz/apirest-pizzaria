import { Router } from "express";
import categoryController from '../controller/categoryController.js'
import categoryMiddleware from '../middlewares/categoryMiddleware.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = Router()

router.post('/', authMiddleware.autenticarToken, categoryMiddleware.VerificarCadastro, categoryController.criarCategoria) //Rota pra validar e cadastro de categorias

router.get('/', categoryController.listarCategorias) //Rota pra ler todas categorias cadastradas

router.get('/:id', categoryController.listarCategoriasPorId) //Rota pra ler apenas categoria requisitada pelo id

router.get('/:id/produtos', categoryController.ProdutoDaCategoria) //Rota pra ler os produtos da categoria

router.put('/:id', authMiddleware.autenticarToken, categoryController.editar) // Rota pra editar categoria

router.delete('/:id', authMiddleware.autenticarToken, categoryController.deletar) //Rota pra deletar categorias

export default router
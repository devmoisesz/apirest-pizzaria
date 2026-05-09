import { Router } from "express";
import categoryController from '../controller/categoryController.js'

const router = Router()

router.post('/', categoryController.criarCategoria) //Rota pra cadastro de categorias

router.get('/', categoryController.listarCategorias) //Rota pra ler todas categorias cadastradas

router.get('/:id', categoryController.listarCategoriasPorId) //Rota pra ler apenas categoria requisitada pelo id

router.get('/:id/produtos', categoryController.ProdutoDaCategoria) //Rota pra ler os produtos da categoria

router.put('/:id', categoryController.editar) // Rota pra editar categoria

router.delete('/:id', categoryController.deletar) //Rota pra deletar categorias

export default router
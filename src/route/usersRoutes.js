import { Router } from "express";
import usersController from '../controller/usersController.js'
import usersMiddleware from '../middlewares/usersMiddleware.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = Router()

router.post('/', usersController.cadastrar) //Rota pra cadastro de usuários

router.get('/', authMiddleware.autenticarToken, usersController.listar) //Rota pra Listar todos usuários cadastrados

router.get('/perfil', authMiddleware.autenticarToken, usersController.listarDados)

router.get('/:id', authMiddleware.autenticarToken, usersController.listarPorId) //Rota pra Listar apenas usuário requisitado pelo ID

router.get('/:id/pedidos', authMiddleware.autenticarToken, usersController.PedidosDoUsuario) //Rota pra Listar os Pedidos do Usuário

router.get('/:id/enderecos', authMiddleware.autenticarToken, usersController.EnderecoDoUsuario) //Rota pra Listar o Endereço do Usuário

router.put('/:id', authMiddleware.autenticarToken, usersController.editarPorId) //Rota pra editar dados do usuário

router.delete('/:id', authMiddleware.autenticarToken, usersController.deleteUser) //Rota pra deletar usuário

export default router
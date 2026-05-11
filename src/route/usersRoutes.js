import { Router } from "express";
import usersController from '../controller/usersController.js'
import usersMiddleware from '../middlewares/usersMiddleware.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = Router()

router.post('/', usersController.cadastrar) //Rota pra cadastro de usuários

router.get('/', authMiddleware.autenticarToken, usersController.listar) //Rota pra listar todos usuários cadastrados

router.get('/perfil', authMiddleware.autenticarToken, usersController.listarDados) //Rota pra ler dados do cliente logado

router.get('/:id', authMiddleware.autenticarToken, usersController.listarPorId) //Rota pra listar apenas usuário requisitado pelo ID

router.get('/:id/pedidos', authMiddleware.autenticarToken, usersController.PedidosDoUsuario) //Rota pra listar os Pedidos do Usuário

router.get('/:id/enderecos', authMiddleware.autenticarToken, usersController.EnderecoDoUsuario) //Rota pra listar o Endereço do Usuário

router.put('/perfil', authMiddleware.autenticarToken, usersController.EditarPerfil) //Rota pra editar perfil do cliente logado

router.put('/:id', authMiddleware.autenticarToken, usersController.editarPorId) //Rota pra editar dados do usuário

router.delete('/:id', authMiddleware.autenticarToken, usersController.deleteUser) //Rota pra deletar usuário

export default router
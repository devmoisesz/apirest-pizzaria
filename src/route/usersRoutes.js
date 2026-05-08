import { Router } from "express";
import usersController from '../controller/usersController.js'

const router = Router()

router.post('/', usersController.cadastrar) //Rota pra cadastro de usuários

router.get('/', usersController.listar) //Rota pra Listar todos usuários cadastrados

router.get('/:id', usersController.listarPorId) //Rota pra Listar apenas usuário requisitado pelo ID

router.get('/:id/pedidos', usersController.PedidosDoUsuario) //Rota pra Listar os Pedidos do Usuário

router.put('/:id', usersController.editarPorId) //Rota pra editar dados do usuário

router.delete('/:id', usersController.deleteUser) //Rota pra deletar usuário

export default router
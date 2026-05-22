import { Router } from "express";
import usersController from '../controller/usersController.js'
import usersMiddleware from '../middlewares/usersMiddleware.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import adminMiddleware from '../middlewares/adminMiddleware.js'

const router = Router()

//Rota pra cadastro de usuários(Pública)
router.post('/', usersMiddleware.ValidarCadastro, 
    usersController.cadastrar
) 

//Rota pra listar todos usuários cadastrados(Apenas Admin tem acesso)
router.get('/', authMiddleware.autenticarToken, 
    adminMiddleware.apenasAdmin, 
    usersController.listar
) 

//Rota pra listar os dados do usuário autenticado
router.get('/perfil', authMiddleware.autenticarToken,
    usersController.listarDados
)

//Rota pra listar apenas usuário requisitado pelo ID(Apenas Admin tem acesso)
router.get('/:id', authMiddleware.autenticarToken, 
    adminMiddleware.apenasAdmin, 
    usersController.listarPorId
) 

//Rota pra listar os Pedidos do Usuário(Apenas Admin tem acesso)
router.get('/:id/pedidos', authMiddleware.autenticarToken, 
    adminMiddleware.apenasAdmin, 
    usersController.PedidosDoUsuario
) 

//Rota pra listar o Endereço do Usuário(Apenas Admin tem acesso)
router.get('/:id/enderecos', authMiddleware.autenticarToken, 
    adminMiddleware.apenasAdmin, 
    usersController.EnderecoDoUsuario
) 

//Rota pro cliente editar os dados do próprio perfil
router.put('/perfil', authMiddleware.autenticarToken,
    usersMiddleware.ValidarEditarPerfil,
    usersController.EditarPerfil
)

//Rota pra editar dados do usuário(Apenas Admin tem acesso)
router.put('/:id', authMiddleware.autenticarToken, 
    adminMiddleware.apenasAdmin, 
    usersMiddleware.ValidarEditarPerfil, 
    usersController.editarPorId
) 

//Rota pro cliente deletar próprio cadastro
router.delete('/perfil', authMiddleware.autenticarToken,
    usersController.DeletarConta
)

//Rota pra deletar usuário(Apenas Admin tem acesso)
router.delete('/:id', authMiddleware.autenticarToken, 
    adminMiddleware.apenasAdmin, 
    usersController.deleteUser
) 

export default router
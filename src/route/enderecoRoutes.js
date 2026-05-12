import { Router } from 'express'
import enderecoController from '../controller/enderecoController.js'
import enderecoMiddleware from '../middlewares/enderecoMiddleware.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import adminMiddleware from '../middlewares/adminMiddleware.js'

const router = Router()

//Rota pra validar e cadastrar de endereços(Apenas Admin)
router.post('/', authMiddleware.autenticarToken, 
    adminMiddleware.apenasAdmin,
    enderecoMiddleware.VerificarCadastro, 
    enderecoController.CadastrarEnderecos) 

//Rota pra validar e cadastrar endereços que o próprio cliente vai cadastrar
router.post('/perfil', authMiddleware.autenticarToken,
    enderecoMiddleware.VerificarEnderecoGenciado,
    enderecoController.CadastrarEnderecosPerfil,
)

//Rota pra listagem de todos os endereços cadastrados(Apenas Admin tem acesso)
router.get('/', authMiddleware.autenticarToken, 
    adminMiddleware.apenasAdmin, 
    enderecoController.ListarEnderecos) 

//Rota pra listagem de apenas um endereço requisitado pelo id(Apenas Admin tem acesso)
router.get('/:id', authMiddleware.autenticarToken,
    adminMiddleware.apenasAdmin, 
    enderecoController.ListarEndereco) 

//Rota pra edição de apenas um endereço requisitado pelo id(Apenas Admin tem acesso)
router.put('/:id', authMiddleware.autenticarToken, 
    adminMiddleware.apenasAdmin, 
    enderecoMiddleware.VerificarEnderecoEditado, 
    enderecoController.EditarEndereco) 

//Rota pra deletar apenas um endereço requisitado pelo id(Apenas Admin tem acesso)
router.delete('/:id', authMiddleware.autenticarToken, 
    adminMiddleware.apenasAdmin, 
    enderecoController.DeletarEndereco) 

export default router
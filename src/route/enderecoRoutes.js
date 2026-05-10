import { Router } from 'express'
import enderecoController from '../controller/enderecoController.js'
import enderecoMiddleware from '../middlewares/enderecoMiddleware.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = Router()

router.post('/', authMiddleware.autenticarToken, enderecoMiddleware.VerificarCadastro, enderecoController.CadastrarEnderecos) //Rota pra validar e cadastros de endereços

router.get('/', authMiddleware.autenticarToken, enderecoController.ListarEnderecos) //Rota pra listagem de todos os endereços cadastrados

router.get('/:id', authMiddleware.autenticarToken, enderecoController.ListarEndereco) //Rota pra listagem de apenas um endereço requisitado pelo id

router.put('/:id', authMiddleware.autenticarToken, enderecoController.EditarEndereco) //Rota pra edição de apenas um endereço requisitado pelo id

router.delete('/:id', authMiddleware.autenticarToken, enderecoController.DeletarEndereco) //Rota pra deletar apenas um endereço requisitado pelo id

export default router
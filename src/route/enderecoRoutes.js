import { Router } from 'express'
import enderecoController from '../controller/enderecoController.js'

const router = Router()

router.post('/', enderecoController.CadastrarEnderecos) //Rota pra validar e cadastros de endereços

router.get('/', enderecoController.ListarEnderecos) //Rota pra listagem de todos os endereços cadastrados

router.get('/:id', enderecoController.ListarEndereco) //Rota pra listagem de apenas um endereço requisitado pelo id

router.put('/:id', enderecoController.EditarEndereco) //Rota pra edição de apenas um endereço requisitado pelo id

router.delete('/:id', enderecoController.DeletarEndereco) //Rota pra deletar apenas um endereço requisitado pelo id

export default router
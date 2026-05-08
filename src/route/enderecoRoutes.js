import { Router } from 'express'
import enderecoController from '../controller/enderecoController.js'

const router = Router()

router.post('/', enderecoController.CadastrarEnderecos) //Rota post pra cadastros de endereços

router.get('/', enderecoController.ListarEnderecos) //Rota get pra listagem de todos os endereços cadastrados

router.get('/:id', enderecoController.ListarEndereco) //Rota get pra listagem de apenas um endereço requisitado

export default router
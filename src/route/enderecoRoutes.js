import { Router } from 'express'
import enderecoController from '../controller/enderecoController.js'

const router = Router()

router.post('/', enderecoController.CadastrarEnderecos) //Rota post pra cadastros de endereços

router.get('/', enderecoController.ListarEnderecos) //Rota get pra listagem de todos os endereços cadastrados

export default router
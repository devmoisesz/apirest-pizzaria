import { Router } from 'express'
import enderecoController from '../controller/enderecoController.js'

const router = Router()

router.post('/', enderecoController.CadastrarEnderecos) //Rota post pra cadastros de endereços

export default router
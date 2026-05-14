import { Router } from 'express'
import loginController from '../controller/loginController.js' 

const router = Router()

router.post('/', loginController.Login) //Rota pra cadastrar login

export default router
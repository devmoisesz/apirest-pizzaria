import { Router } from "express";
import usersController from '../controller/usersController.js'

const router = Router()

router.post('/', usersController.cadastrar)

router.get('/', usersController.listar)

router.get('/:id', usersController.listarPorId)

router.put('/:id', usersController.editarPorId)

router.delete('/:id', usersController.deleteUser)

export default router
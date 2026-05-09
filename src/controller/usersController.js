//Contraller faz as requisições do servidor e responde
import usersService from '../service/usersService.js'

const cadastrar = async(req, res, next) => {
    try{
        const { nome, email } = req.body
        const usuario = await usersService.cadastrar({nome, email})
        res.status(201).json(usuario)
    } catch(error){
        next(error)
    }
}

const listar = async(req, res, next) => {
    try{
        const usuarios = await usersService.listar()
        res.status(200).json(usuarios)
    } catch(error){
        next(error)
    }
}

const listarPorId = async(req, res, next) =>{
    try{
        const usuarioId = req.params.id
        const usuarios = await usersService.listarPorId(usuarioId)
        res.status(200).json(usuarios)
    }catch(error){
        next(error)
    }
}

//Listagem do pedido do usuário
async function PedidosDoUsuario(req, res, next) {
    try {
        const id = req.params.id
        const PedidosDoUsuario = await usersService.PedidosDoUsuario(id)
        res.status(200).json(PedidosDoUsuario)
    } catch (error) {
        next(error)
    }
}

async function EnderecoDoUsuario(req, res, next) {
    try {
        const id = req.params.id
        const EnderecoDoUsuario = await usersService.EnderecoDoUsuario(id)
        res.status(200).json(EnderecoDoUsuario)
    } catch (error) {
        next(error)
    }
}

const editarPorId = async(req, res, next) =>{
    try{
        const usuarioId = req.params.id
        const {nome, email} = req.body
        const upUser = await usersService.update(usuarioId, {nome, email})
        res.status(200).json(upUser)
    }catch(error){
        next(error)
    }
}

const deleteUser = async(req, res, next)=>{
    try{
        const usuarioId = req.params.id
        const delUser = await usersService.deleteUser(usuarioId)
        res.status(200).json({mensagem: 'Usuário Deletado com sucesso!'})
    }catch(error){
        next(error)
    }
}

export default {cadastrar, listar, listarPorId, editarPorId, deleteUser, PedidosDoUsuario, EnderecoDoUsuario}
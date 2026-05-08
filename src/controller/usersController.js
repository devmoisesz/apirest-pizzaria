//Contraller faz as requisições do servidor e responde
import usersService from '../service/usersService.js'

const cadastrar = async(req, res) => {
    try{
        const { nome, email } = req.body
        const usuario = await usersService.cadastrar({nome, email})
        res.status(201).json(usuario)
    } catch(error){
        res.status(409).json({mensagem: error.message})
    }
}

const listar = async(req, res) => {
    try{
        const usuarios = await usersService.listar()
        res.status(200).json(usuarios)
    } catch(error){
        res.status(404).json({mensagem: error.message})
    }
}

const listarPorId = async(req, res) =>{
    try{
        const usuarioId = req.params.id
        const usuarios = await usersService.listarPorId(usuarioId)
        res.status(200).json(usuarios)
    }catch(error){
        res.status(404).json({mensagem: error.message})
    }
}

//Listagem do pedido do usuário
async function PedidosDoUsuario(req, res) {
    try {
        const id = req.params.id
        const PedidosDoUsuario = await usersService.PedidosDoUsuario(id)
        res.status(200).json(PedidosDoUsuario)
    } catch (error) {
        res.status(404).json({mensagem: error.message})
    }
}

const editarPorId = async(req, res) =>{
    try{
        const usuarioId = req.params.id
        const {nome, email} = req.body
        const upUser = await usersService.update(usuarioId, {nome, email})
        res.status(200).json(upUser)
    }catch(error){
        res.status(404).json({mensagem: error.message})
    }
}

const deleteUser = async(req, res)=>{
    try{
        const usuarioId = req.params.id
        const delUser = await usersService.deleteUser(usuarioId)
        res.status(200).json({mensagem: 'Usuário Deletado com sucesso!'})
    }catch(error){
        res.status(404).json({mensagem: error.message})
    }
}

export default {cadastrar, listar, listarPorId, editarPorId, deleteUser, PedidosDoUsuario}
import usersService from '../service/usersService.js'

const cadastrar = async(req, res) => {
    try{
        const { nome, email } = req.body
        const usuario = await usersService.cadastrar({nome, email})
        res.status(201).json(usuario)
    } catch(error){
        res.status(400).json({mensagem: error.message})
    }
}

const listar = async(req, res) => {
    try{
        const usuarios = await usersService.listar()
        res.status(200).json(usuarios)
    } catch(error){
        res.status(400).json({mensagem: error.message})
    }
}

const listarPorId = async(req, res) =>{
    try{
        const usuarioId = req.params.id
        const usuarios = await usersService.verifiqueUser(usuarioId)
        res.status(200).json(usuarios)
    }catch(error){
        res.status(400).json({mensagem: error.message})
    }
}

export default {cadastrar, listar, listarPorId}
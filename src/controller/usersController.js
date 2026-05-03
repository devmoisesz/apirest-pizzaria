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
    const usuario = await usersService.listar()
}

export default {cadastrar, listar}
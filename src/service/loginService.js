import usersRepository from '../repository/usersRepository.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

async function Login(email, senha) {
    const usuario = await usersRepository.BuscarUsuario(email)
    if(!usuario) {
        const error = new Error('Email não encontrado!')
        error.status = 404
        throw error
    }
    const senhaValida = await bcrypt.compare(senha, usuario.senha)
    if(!senhaValida) {
        const error = new Error('Senha inválida!')
        error.status = 401
        throw error
    }
    const token = jwt.sign(
    { id: usuario.id, papel: usuario.papel }, 
    process.env.JWT_SECRET,       
    {expiresIn: '7d' }          
    )
    return { token }
}

export default {Login}
import usersRepository from '../repository/usersRepository.js'
import bcrypt, { hash } from 'bcryptjs'
import jwt from 'jsonwebtoken'

async function Login(email, senha) {
    const usuario = await usersRepository.BuscarUsuario(email)
    if(!usuario) throw new Error("Email não encontrado!")
    const senhaValida = await bcrypt.compare(senha, usuario.senha)
    if(!senhaValida) throw new Error("Senha Inválida!")
    const token = jwt.sign(
    { id: usuario.id, papel: usuario.papel }, 
    process.env.JWT_SECRET,       
    {expiresIn: '7d' }          
    )
    return { token }
}

export default {Login}
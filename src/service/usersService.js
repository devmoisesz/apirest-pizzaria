//Service faz as verificações

import usersRepository from '../repository/usersRepository.js'
import pedidosRepository from '../repository/pedidosRepository.js'
import bcrypt from 'bcryptjs'

const cadastrar = async ({nome, email, senha}) => {
    //Verificar se o email requisitado já foi cadastrado
    const jaExiste = await usersRepository.buscarPorEmail(email)
    if(jaExiste) throw new Error('Email já cadastrado')
    const hash = await bcrypt.hash(senha, 10)
    //Retornar o cadastro feito
    return usersRepository.criar({nome, email, senha: hash})
}

const listar = async() => {
    //Retorna a lista completa de usuários
    return usersRepository.listar()
}

const listarPorId = async(id) =>{
    //Verificar se o usuário requisitado existe no banco
    const usuario = await usersRepository.buscarPorId(id)
    if(!usuario) throw new Error('Usuário não encontrado')
    //Depois da Verificação, retornar o usuário requisitado
    return usuario
}

async function listarDados(id) {
    const usuario = await usersRepository.buscarPorId(id)
    if(!usuario) throw new Error('Usuário não encontrado')
    return usuario
}

async function PedidosDoUsuario(id) {
    //Verificar se o usuário requisitado existe no banco
    const usuario = await usersRepository.buscarPorId(id)
    if(!usuario) throw new Error('Usuário não encontrado')
    const pedidos = await pedidosRepository.PedidosDoUsuario(id)
    //verificar se o usuário requisitado tem pedidos cadastrados
    if(!pedidos || pedidos.length === 0) throw new Error("Usuário sem pedidos")
    return pedidos
}

async function EnderecoDoUsuario(id) {
    const usuario = await usersRepository.buscarPorId(id)
    if(!usuario) throw new Error('Usuário não encontrado')
    const endereco = await usersRepository.EnderecoDoUsuario(id)
    if(!endereco || endereco.length === 0) throw new Error("Usuário sem endereço cadastrado")
    return endereco
}

async function EditarPerfil(id, {nome, email, senha}) {
    // Mantém email atual se não foi enviado (evita NULL no NOT NULL)
    let emailAtual = email
    if (!emailAtual) {
        const usuarioAtual = await usersRepository.buscarPorId(id)
        if (!usuarioAtual) throw new Error('Usuário não encontrado')
        emailAtual = usuarioAtual.email
    }

    // Se mandou email (ou mesmo mantendo o atual), valida duplicidade
    const usuarioComEmail = await usersRepository.BuscarUsuario(emailAtual)
    if (usuarioComEmail && usuarioComEmail.id !== id) {
        throw new Error('Email já cadastrado')
    }

    let senhaHash
    if (senha) {
        senhaHash = await bcrypt.hash(senha, 10)
    } else {
        // garante que não vai atualizar senha para NULL
        senhaHash = undefined
    }

    return await usersRepository.EditarPerfil(id, {
        nome,
        email: emailAtual,
        senha: senhaHash
    })
}

async function update (id, { nome, email, senha }) {
    const jaExiste = await usersRepository.buscarPorEmail(email)
    if(jaExiste) throw new Error('Email já cadastrado')

    // Se não mandou email, mantém o email atual no banco (evita NULL no NOT NULL)
    let emailAtual = email
    if(!emailAtual){
        const usuarioAtual = await usersRepository.buscarPorId(id)
        if(!usuarioAtual) throw new Error('Usuário não encontrado')
        emailAtual = usuarioAtual.email
    }

    const usuario = await usersRepository.editaUser(id, nome, emailAtual, senha)
    if(!usuario) throw new Error('Usuário não encontrado')
    return usuario
}


async function DeletarConta(usuarioId, senha) {
    const usuario = await usersRepository.buscarPorIdCompleto(usuarioId)
    const senhaValida = await bcrypt.compare(senha, usuario.senha) 
    if(!senhaValida) throw new Error("Senha inválida!")
    return await usersRepository.delect(usuarioId)
}

const deleteUser = async(id)=>{
    //Consulta o banco se o id requisitado pro delete existe
    const usuario = await usersRepository.buscarPorId(id)
    if(!usuario){
        throw new Error('Usuário não encontrado')
    }
    //Retorna pro Controller o delete
    return usersRepository.delect(id)
}

export default {cadastrar, listar, listarPorId, update, deleteUser, PedidosDoUsuario, EnderecoDoUsuario, listarDados, EditarPerfil, DeletarConta}
import usersRepository from '../repository/usersRepository.js'

const cadastrar = async ({nome, email}) => {
    const jaExiste = await usersRepository.buscarPorEmail(email)
    if(jaExiste) throw new Error('Email já cadastrado')
    return usersRepository.criar({nome, email})
}

const listar = async() => {
    return usersRepository.listar()
}

const verifiqueUser = async(id) =>{
    const usuario = await usersRepository.buscarPorId(id)
    if(!usuario){
        throw new Error('Usuário não encontrado')
    }
    return usuario
}

const update = async(id, up) =>{
    const usuario = await usersRepository.editaUser(id, up)
    if(!usuario){
        throw new Error('Usuário não encontrado')
    }
    return usuario
}

const deleteUser = async(id)=>{
    const usuario = await usersRepository.buscarPorId(id)
    if(!usuario){
        throw new Error('Usuário não encontrado')
    }
    return usersRepository.delect(id)
}

export default {cadastrar, listar, verifiqueUser, update, deleteUser}
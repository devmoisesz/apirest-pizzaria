//Service faz as verificações
import usersRepository from '../repository/usersRepository.js'

const cadastrar = async ({nome, email}) => {
    //Verificar se o email requisitado já foi cadastrado
    const jaExiste = await usersRepository.buscarPorEmail(email)
    if(jaExiste) throw new Error('Email já cadastrado')
    //Retornar o cadastro feito
    return usersRepository.criar({nome, email})
}

const listar = async() => {
    //Retorna a lista completa de usuários
    return usersRepository.listar()
}

const listarPorId = async(id) =>{
    //Verificar se o usuário requisitado existe no banco
    const usuario = await usersRepository.buscarPorId(id)
    if(!usuario){
        throw new Error('Usuário não encontrado')
    }
    //Depois da Verificação, retornar o usuário requisitado
    return usuario
}

const update = async(id, up) =>{
    //Verifica pra edição se o usuário existe no banco e atualiza as alterações no banco
    const usuario = await usersRepository.editaUser(id, up)
    if(!usuario){
        throw new Error('Usuário não encontrado')
    }
    //Retorna usuario editado
    return usuario
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

export default {cadastrar, listar, listarPorId, update, deleteUser}
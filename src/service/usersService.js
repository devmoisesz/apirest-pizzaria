import usersRepository from '../repository/usersRepository.js'

const cadastrar = async ({nome, email}) => {
    const jaExiste = await usersRepository.buscarPorEmail(email)
    if(jaExiste) throw new Error('Email já cadastrado')
    return usersRepository.criar({nome, email})
}

const listar = async() => {
    return usersRepository.listar()
}

export default {cadastrar, listar}
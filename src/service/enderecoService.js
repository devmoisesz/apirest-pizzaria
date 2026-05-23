import enderecoRepository from '../repository/enderecoRepository.js'

async function CadastrarEnderecos(user_id, cidade, rua, numero, bairro, complemento, cep) {
    //verificar se usuario requisitado existe
    const UsuarioId = await enderecoRepository.BuscarIDdoUsuario(user_id)
    if(!UsuarioId) {
        const error = new Error('Usuário não encontrado!')
        error.status = 404
        throw error
    }
    return await enderecoRepository.CadastrarEnderecos(user_id, cidade, rua, numero, bairro, complemento, cep)
}

async function ListarEnderecos() {
    return await enderecoRepository.ListarEnderecos()
}


async function ListarEndereco(id) {
    const idEndereco = await enderecoRepository.BuscarIDdoEndereco(id)
    if(!idEndereco) {
        const error = new Error('Endereço não encontrado!')
        error.status = 404
        throw error
    }
    return await enderecoRepository.ListarEndereco(id)
}

async function ListarEnderecoGerenciado(idUser) {
    const userId = await enderecoRepository.BuscarIDdoUsuario(idUser)
    if(!userId) {
        const error = new Error('Usuário não encontrado!')
        error.status = 404
        throw error
    }
    const endereco = await enderecoRepository.ListarEnderecoGerenciado(idUser)
    if(!endereco) {
        const error = new Error('Endereço não encontrado!')
        error.status = 404
        throw error
    }
    return endereco
}

async function EditarEnderecoGerenciado(id_user, idEndereco, cidade, rua, numero, bairro, complemento, cep) {
    const upEndereco = await enderecoRepository.EditarEnderecoGerenciado(
        id_user, idEndereco, cidade, rua, numero, bairro, complemento, cep
    )
    if(!upEndereco) {
        const error = new Error('Endereço não encontrado!')
        error.status = 404
        throw error
    }
    return upEndereco
}

async function EditarEndereco(id, cidade, rua, numero, bairro, complemento, cep) {
    const idEndereco = await enderecoRepository.BuscarIDdoEndereco(id)
    if(!idEndereco) {
        const error = new Error('Endereço não encontrado!')
        error.status = 404
        throw error
    }
    return await enderecoRepository.EditarEndereco(id, cidade, rua, numero, bairro, complemento, cep)
}

async function DeletarEnderecoGerenciado(idUsuario, idEndereco) {
    const enderecoId = await enderecoRepository.BuscarIDdoEndereco(idEndereco)
    if(!enderecoId) {
        const error = new Error('Endereço não encontrado!')
        error.status = 404
        throw error
    }
    return await enderecoRepository.DeletarEnderecoGenciado(idUsuario, idEndereco)
}

async function DeletarEndereco(id) {
    const idEndereco = await enderecoRepository.BuscarIDdoEndereco(id)
    if(!idEndereco) {
        const error = new Error('Endereço não encontrado!')
        error.status = 404
        throw error
    }
    return await enderecoRepository.DeletarEndereco(id)
}

export default {CadastrarEnderecos, ListarEnderecos, ListarEndereco, ListarEnderecoGerenciado, EditarEnderecoGerenciado, EditarEndereco, DeletarEnderecoGerenciado, DeletarEndereco}
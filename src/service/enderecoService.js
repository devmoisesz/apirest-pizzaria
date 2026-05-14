import enderecoRepository from '../repository/enderecoRepository.js'

async function CadastrarEnderecos(user_id, cidade, rua, numero, bairro, complemento, cep) {
    //verificar se usuario requisitado existe
    const id = await enderecoRepository.BuscarIDdoUsuario(user_id)
    if(!id) throw new Error("Usuário não encontrado!")
    return await enderecoRepository.CadastrarEnderecos(user_id, cidade, rua, numero, bairro, complemento, cep)
}

async function ListarEnderecos() {
    return await enderecoRepository.ListarEnderecos()
}


async function ListarEndereco(id) {
    const idEndereco = await enderecoRepository.BuscarIDdoEndereco(id)
    if(!idEndereco) throw new Error("Endereço não Encontrado!")
    return await enderecoRepository.ListarEndereco(id)
}

async function ListarEnderecoGerenciado(idUser) {
    const userId = await enderecoRepository.BuscarIDdoUsuario(idUser)
    if(!userId) throw new Error("Usuário não Encontrado!")
    const endereco = await enderecoRepository.ListarEnderecoGerenciado(idUser)
    if(!endereco) throw new Error("Endereço não Encontrado!")
    return endereco
}

async function EditarEnderecoGerenciado(id_user, idEndereco, cidade, rua, numero, bairro, complemento, cep) {
    const upEndereco = await enderecoRepository.EditarEnderecoGerenciado(
        id_user, idEndereco, cidade, rua, numero, bairro, complemento, cep
    )
    if(!upEndereco) throw new Error("Não Encontrado!")
    return upEndereco
}

async function EditarEndereco(id, cidade, rua, numero, bairro, complemento, cep) {
    const idEndereco = await enderecoRepository.BuscarIDdoEndereco(id)
    if(!idEndereco) throw new Error("Endereço não Encontrado!")
    return await enderecoRepository.EditarEndereco(id, cidade, rua, numero, bairro, complemento, cep)
}

async function DeletarEnderecoGerenciado(idUsuario, idEndereco) {
    const enderecoId = await enderecoRepository.BuscarIDdoEndereco(idEndereco)
    if(!enderecoId) throw new Error("Endereço não Encontrado!")
    return await enderecoRepository.DeletarEnderecoGenciado(idUsuario, idEndereco)
}

async function DeletarEndereco(id) {
    const idEndereco = await enderecoRepository.BuscarIDdoEndereco(id)
    if(!idEndereco) throw new Error("Endereço não Encontrado!")
    return await enderecoRepository.DeletarEndereco(id)
}

export default {CadastrarEnderecos, ListarEnderecos, ListarEndereco, ListarEnderecoGerenciado, EditarEnderecoGerenciado, EditarEndereco, DeletarEnderecoGerenciado, DeletarEndereco}
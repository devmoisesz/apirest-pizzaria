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

async function EditarEndereco(id, cidade, rua, numero, bairro, complemento, cep) {
    const idEndereco = await enderecoRepository.BuscarIDdoEndereco(id)
    if(!idEndereco) throw new Error("Endereço não Encontrado!")
    return await enderecoRepository.EditarEndereco(id, cidade, rua, numero, bairro, complemento, cep)
}

export default {CadastrarEnderecos, ListarEnderecos, ListarEndereco, EditarEndereco}
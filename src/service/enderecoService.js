import enderecoRepository from '../repository/enderecoRepository.js'

async function CadastrarEnderecos(user_id, cidade, rua, numero, bairro, complemento, cep) {
    //verificar se usuario requisitado existe
    const id = await enderecoRepository.BuscarIDdoUsuario(user_id)
    if(!id) throw new Error("Usuário não encontrado!")
    return await enderecoRepository.CadastrarEnderecos(user_id, cidade, rua, numero, bairro, complemento, cep)
}

export default {CadastrarEnderecos}
import enderecoService from '../service/enderecoService.js'

async function CadastrarEnderecos(req, res, next) {
    try {
        const {user_id, cidade, rua, numero, bairro, complemento, cep} = req.body //request nos dados preenchidos no body
        const endereco = await enderecoService.
        CadastrarEnderecos(
            user_id, cidade, rua, numero, bairro, complemento, cep
        )
        //status cadastrado com sucesso
        res.status(201).json(endereco)
    } catch (error) {
        //status recurso não encontrado
        next(error)
    }
}

async function CadastrarEnderecosPerfil(req, res, next) {
    try {
        const {cidade, rua, numero, bairro, complemento, cep} = req.body
        //Pegar id do Token do cliente e guardar na variavel
        const user_id = req.usuario.id
        const endereco = await enderecoService.
        CadastrarEnderecos(
            user_id, cidade, rua, numero, bairro, complemento, cep
        )
        res.status(201).json(endereco)
    } catch (error) {
        next(error)
    }
}

async function ListarEnderecos(req, res, next) {
    try {
        const enderecos = await enderecoService.ListarEnderecos()
        res.status(200).json(enderecos)
    } catch (error) {
        next(error)
    }
}

async function ListarEnderecoGerenciado(req, res, next) {
    try {
        const usuarioId = req.usuario.id
        const endereco = await enderecoService.ListarEnderecoGerenciado(usuarioId)
        res.status(200).json(endereco)
    } catch (error) {
        next(error)
    }
}

async function ListarEndereco(req, res, next) {
    try {
        const id = req.params.id
        const endereco = await enderecoService.ListarEndereco(id)
        res.status(200).json(endereco)
    } catch (error) {
        next(error)
    }
}

async function EditarEnderecoGerenciado(req, res, next) {
    try {
        const idUsuario = req.usuario.id
        const idEndereco = req.params.id
        const {cidade, rua, numero, bairro, complemento, cep} = req.body
        const upEndereco = await enderecoService.EditarEnderecoGerenciado(idUsuario, idEndereco, cidade, rua, numero, bairro, complemento, cep)
        res.status(200).json(upEndereco)
    } catch (error) {
        next(error)
    }
}

async function EditarEndereco(req, res, next) {
    try {
        const id = req.params.id
        const {cidade, rua, numero, bairro, completo, cep} = req.body
        const upEndereco = await enderecoService.EditarEndereco(id, cidade, rua, numero, bairro, completo, cep)
        res.status(200).json(upEndereco)
    } catch (error) {
        next(error)
    }
}

async function DeletarEnderecoGerenciado(req, res, next) {
    try {
        const idUsuario = req.usuario.id
        const idEndereco = req.params.id
        await enderecoService.DeletarEnderecoGerenciado(idUsuario, idEndereco)
        res.status(200).json({mensagem: "Deletado com sucesso!"})
    } catch (error) {
        next(error)
    }
}

async function DeletarEndereco(req, res, next) {
    try {
        const idUser = req.params.id
        const deletar = await enderecoService.DeletarEndereco(idUser)
        res.status(200).json({mensagem: 'Deletado com sucesso!'})
    } catch (error) {
        next(error)
    }
}

//exportação das funções
export default {CadastrarEnderecos, CadastrarEnderecosPerfil, ListarEnderecos, ListarEndereco, ListarEnderecoGerenciado, EditarEnderecoGerenciado, EditarEndereco, DeletarEnderecoGerenciado, DeletarEndereco}
import enderecoService from '../service/enderecoService.js'

async function CadastrarEnderecos(req, res) {
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
        res.status(404).json({mensagem: error.message})
    }
}

async function ListarEnderecos(req, res) {
    try {
        const enderecos = await enderecoService.ListarEnderecos()
        res.status(200).json(enderecos)
    } catch (error) {
        res.status(404).json({mensagem: error.message})
    }
}

async function ListarEndereco(req, res) {
    try {
        const id = req.params.id
        const endereco = await enderecoService.ListarEndereco(id)
        res.status(200).json(endereco)
    } catch (error) {
        res.status(404).json({mensagem: error.message})
    }
}

async function EditarEndereco(req, res) {
    try {
        const id = req.params.id
        const {cidade, rua, numero, bairro, completo, cep} = req.body
        const upEndereco = await enderecoService.EditarEndereco(id, cidade, rua, numero, bairro, completo, cep)
        res.status(200).json(upEndereco)
    } catch (error) {
        res.status(404).json({mensagem: error.message})
    }
}

//exportação das funções
export default {CadastrarEnderecos, ListarEnderecos, ListarEndereco, EditarEndereco}
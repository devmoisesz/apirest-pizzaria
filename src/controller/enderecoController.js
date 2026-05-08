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

//exportação das funções
export default {CadastrarEnderecos}
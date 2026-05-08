import { defaults } from 'pg'
import enderecoService from '../service/enderecoService.js'

async function CadastrarEnderecos(req, res) {
    try {
        const {user_id, cidade, rua, numero, bairro, complemento, cep} = req.body
        const endereco = enderecoService.
        CadastrarEnderecos(
            user_id, cidade, rua, numero, bairro, complemento, complemento, cep
        )
        res.status(201).json(endereco)
    } catch (error) {
        res.status(404).json({mensagem: error.message})
    }
}

export default {CadastrarEnderecos}
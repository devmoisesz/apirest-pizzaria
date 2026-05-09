import { z } from 'zod'

const schema = z.object({
    user_id: z.number().int(),
    cidade: z.string('Valor inválido. O campo cidade deve conter texto.').min(3).max(40),
    rua: z.string('Valor inválido. O campo rua deve conter texto.').max(40),
    numero: z.string('Valor inválido. O campo número deve conter texto.').max(10),
    bairro: z.string('Valor inválido. O campo bairro deve conter texto.').max(40),
    complemento: z.string('Valor inválido. O campo complemento deve conter texto.').max(30).optional(),
    cep: z.string('Valor inválido. O campo cep deve conter texto.').min(9).max(9)
})

function VerificarCadastro(req, res, next){
    const cadastro = schema.safeParse(req.body)
    //verificar dados
    if(!cadastro.success){
        return res.status(400).json({
            error: cadastro.error.issues.map(issue => ({
                campo: issue.path[0], //nome do campo que falhou
                mensagem: issue.message //descrição do erro
            }))
        })
    }
    //dados válidos -> passa para o controller
    next()
}

export default {VerificarCadastro}
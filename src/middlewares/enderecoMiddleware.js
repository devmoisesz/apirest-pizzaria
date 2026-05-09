import { z } from 'zod'

const schema = z.object({
    user_id: z.number().int(),
    cidade: z.string().min(3).max(40),
    rua: z.string().max(40),
    numero: z.string().max(10),
    bairro: z.string().max(40),
    complemento: z.string().max(30).optional(),
    cep: z.string().min(9).max(9)
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
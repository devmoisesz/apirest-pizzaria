import { z } from 'zod'

const schema = z.object({
    nome: z.string().max(50)
})

function VerificarCadastro(req, res, next){
    const cadastro = schema.safeParse(req.body)
    if(!cadastro.success){
        return res.status(400).json({
            error: cadastro.error.issues.map(issue =>({
                campo: issue.path[0], //campo que falhou
                mensagem: issue.message //descrição do erro
            }))
        })
    }
    //dados válidos -> passa para o controller
    next()
}

export default {VerificarCadastro}
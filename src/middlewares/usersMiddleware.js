import { z } from 'zod'

const schema = z.object({
    nome: z.string().min(3),
    email: z.string().email()
})

function ValidarCadastro(req, res, next){
    const resultado = schema.safeParse(req.body)
    if(!resultado.success){
        return res.status(400).json({
            erros: resultado.error.issues.map(issue => ({
                campo: issue.path[0],
                mensagem: issue.message
            }))
        })
        next()
    }
}

export default {ValidarCadastro}
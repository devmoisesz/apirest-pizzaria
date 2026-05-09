import { z } from 'zod'

const schema = z.object({
    name_product: z.string().min(3),
    price: z.number().positive(),
    description: z.string().min(4),
    category_id: z.int()
})

function ValidarCadastro (req, res, next){
    const cadastro = schema.safeParse(req.body)
    //verificar dados
    if(!cadastro.success){
        return res.status(400).json({
            erros: cadastro.error.issues.map(issue => ({
                campo: issue.path[0],
                mensagem: issue.message
            }))
        })
    }
    //dados válidos -> passa pro controller
    next()
}

export default {ValidarCadastro}
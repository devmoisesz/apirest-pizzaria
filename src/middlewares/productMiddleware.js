import { z } from 'zod'

const schema = z.object({
    name_product: z.string('Valor inválido. O campo nome deve conter texto.').min(3, 'Valor inválido. O campo nome deve ter no mínimo 3 caracteres.'),
    price: z.number('Valor inválido. O campo preço deve conter número').positive('Valor inválido. O campo preço deve conter número positivo.').min(0.1),
    description: z.string('Valor inválido. O campo descrição deve conter texto.').min(4, 'Valor inválido. O campo descrição deve ter no mínimo 4 caracteres'),
    category_id: z.number().int()
})

function ValidarCadastro (req, res, next){
    const cadastro = schema.safeParse(req.body)
    //verificar dados
    if(!cadastro.success){
        return res.status(400).json({
            erros: cadastro.error.issues.map(issue => ({
                campo: issue.path[0], //nome do campo que falhou
                mensagem: issue.message //descrição do erro
            }))
        })
    }
    //dados válidos -> passa pro controller
    next()
}

export default {ValidarCadastro}
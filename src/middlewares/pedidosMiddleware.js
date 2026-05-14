import { z } from 'zod'

const schema = z.object({
    user_id: z.number().int(),
    endereco_id: z.number().int(),
    itens: z.array(z.object({
        product_id: z.number().int(),
        quantity: z.number().int().positive()
    }))
})

const schemaOpcional = z.object({
    status: z.string()
})

function ValidarCadastro(req, res, next){
    const cadastro = schema.safeParse(req.body)
    //Verificar dados
    if(!cadastro.success){
        return res.status(400).json({
            erros: cadastro.error.issues.map(issue => ({
                campo: issue.path[0], // nome do campo que falhou
                mensagem: issue.message // descrição do erro
            }))
        })
    }
    //dados válidos -> passa para o controller
    next()
}

function ValidarEdicaoDePedido(req, res, next){
    const cadastro = schemaOpcional.safeParse(req.body)
    //Verificar dados
    if(!cadastro.success){
        return res.status(400).json({
            erros: cadastro.error.issues.map(issue => ({
                campo: issue.path[0], // nome do campo que falhou
                mensagem: issue.message // descrição do erro
            }))
        })
    }
    //dados válidos -> passa para o controller
    next()
}

export default {ValidarCadastro, ValidarEdicaoDePedido}
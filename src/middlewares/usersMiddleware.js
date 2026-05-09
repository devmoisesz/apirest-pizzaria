// Middleware de validação que roda antes do controller
import { z } from 'zod'

//Schema define o formato esperado do body
const schema = z.object({
    nome: z.string('Valor inválido. O campo nome deve conter texto.').min(3, 'Valor inválido. Nome deve ter no mínimo 3 caracteres.'),
    email: z.string('Valor inválido. O campo email deve conter texto.').email('Valor inválido. Email inválido.')
})

function ValidarCadastro(req, res, next){
    //safeParse() valida os dados sem lançar exceção
    const resultado = schema.safeParse(req.body)
    //verificar dados
    if(!resultado.success){
        //dados inválidos -> retorna erros
        //map pra simplificar o erro
        return res.status(400).json({
            erros: resultado.error.issues.map(issue => ({
                campo: issue.path[0], //nome do campo que falhou
                mensagem: issue.message // descrição do erro
            }))
        })
    }
    //dados válidos -> passa para o controller
    next()
}

export default {ValidarCadastro}
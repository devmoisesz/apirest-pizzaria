import jwt from 'jsonwebtoken'

function apenasAdmin(req, res, next){
    if(req.usuario.papel !== 'aadmin'){
        const erro = new Error('Acesso negado!')
        erro.status = 403
        return next(erro)
    }
    next()
}

export default {apenasAdmin}
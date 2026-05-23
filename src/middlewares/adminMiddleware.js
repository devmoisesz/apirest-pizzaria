function apenasAdmin(req, res, next){
    if(req.usuario.papel !== 'admin'){
        const erro = new Error('Acesso Negado!')
        erro.status = 403
        return next(erro)
    }
    next()
}

export default {apenasAdmin}
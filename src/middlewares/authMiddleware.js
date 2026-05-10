import jwt from 'jsonwebtoken' 

function autenticarToken(req, res, next){
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if(!token) throw new Error("Token não autorizado!")
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.usuario = decoded 
        next()
    } catch (error) {
        error.status = 401
        next(error)
    }
}

export default {autenticarToken}
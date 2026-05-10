import loginService from '../service/loginService.js'

async function Login(req, res, next){
    try {
        const {email, senha} = req.body
        const login = await loginService.Login(email, senha)
        res.status(201).json(login)
    } catch (error) {
        next(error)
    }
}

export default {Login}
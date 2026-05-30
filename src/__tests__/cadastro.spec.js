import app from "../../app.js";
import req from 'supertest'
import 'dotenv/config'

describe('POST /usuarios', () => {
    it('deve retornar erro ao cadastrar email já existente.', async () => {
        const res = await req(app)
            .post('/usuarios')
            .send({
                nome: "teste247",
                email: "cliente123@gmail.com",
                senha: "247247"
            })

        expect(res.status).toBe(201)
        expect(res.body.mensagem).toBe('Email já cadastrado')
    })
})
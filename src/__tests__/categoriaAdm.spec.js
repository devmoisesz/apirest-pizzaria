//Testar se apenas adm pode cadastradar categoria

import app from "../../app";
import req from 'supertest'
import 'dotenv/config'

//Token de cliente
const tokenCliente = process.env.TOKEN_TESTING

describe('POST /categoria', () => {
    it('deve retornar erro ao um cliente autenticado tentar cadastrar uma categoria', async () => {
        const res = await req(app)
        .post('/categoria')
        .set('Authorization', `Bearer ${tokenCliente}`)
        .send({
            nome: "teste"
        })

        expect(res.status).toBe(403)
        expect(res.body.mensagem).toBe('Acesso Negado!')
    })
})
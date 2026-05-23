//Arquivo de testes
//Testar se a API confia no token ou no body

import app from '../../app.js'
import req from 'supertest'
import 'dotenv/config'

const validToken = process.env.TOKEN_TESTING

describe('POST /pedidos/perfil', () => {
    it('deve criar pedido com user_id do token', async () => {
        const res = await req(app)
            .post('/pedidos/perfil')
            .set('Authorization', `Bearer ${validToken}`)
            .send({
                user_id: 999,  // Cliente tenta fake
                endereco_id: 7,
                itens: [{ product_id: 2, quantity: 1 }]
            })
        
        expect(res.status).toBe(201)
        expect(res.body.user_id).toBe(31)  // ID real, não 999!
    })
})
//Arquivo de testes
//Testar se a API confia no token ou no body

import app from '../../app.js'
import request from 'supertest'
import 'dotenv/config'

const validToken = process.env.TOKEN_TESTING

describe('POST /pedidos/perfil', () => {
    it('deve criar pedido com user_id do token', async () => {
        const response = await request(app)
            .post('/pedidos/perfil')
            .set('Authorization', `Bearer ${validToken}`)
            .send({
                user_id: 999,  // Cliente tenta fake
                endereco_id: 7,
                itens: [{ product_id: 2, quantity: 1 }]
            })
        
        console.log(response.body)
        expect(response.status).toBe(201)
        expect(response.body.user_id).toBe(31)  // ID real, não 999!
    })
})
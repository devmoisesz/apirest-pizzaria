//Verificar se a API realmente não aceita unit_price do body

import app from "../../app";
import req from 'supertest';
import 'dotenv/config';
import pedidosRepository from "../repository/pedidosRepository";

const validToken = process.env.TOKEN_TESTING

describe('POST /pedidos/perfil', () => {
    it('deve ignorar unit_price enviado pelo body e usar preço do produto', async () => {
        const res = await req(app)
            .post('/pedidos/perfil')
            .set('Authorization', `Bearer ${validToken}`)
            .send({
                endereco_id: 7,
                itens: [
                    { 
                        product_id: 2, 
                        quantity: 1, 
                        unit_price: 19.90
                    }
                ]
            })
        
        expect(res.status).toBe(201)
        const pedido = await pedidosRepository.buscarPedido(res.body.id)
        //verifica se a API não usou o valor enviado
        expect(pedido.itens[0].unit_price).not.toBe(19.90)
        
    })
})
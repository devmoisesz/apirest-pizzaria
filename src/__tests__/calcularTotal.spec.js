import calcularTotalPedido from '../utils/calcularTotal.js'

describe('calcularTotalPedido', () => {
    it('deve calcular total corretamente', () => {

        const itens = [
            { quantity: 3, unit_price: 50},
            { quantity: 1, unit_price: 50 }
        ]

        const total = calcularTotalPedido(itens)
        
        console.log(total)
        expect(total).toBe(200)
    })

})
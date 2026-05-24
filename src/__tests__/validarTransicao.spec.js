import validarTransicaoStatus from '../utils/validarTransicao.js'

describe('validarTransicaoStatus', () => {

    it('deve permitir pendente para preparando', () => {

        const resultado = validarTransicaoStatus(
            'pendente',
            'preparando'
        )

        expect(resultado).toBe(true)
    })

    it('não deve permitir entregue para preparando', () => {

        const resultado = validarTransicaoStatus(
            'entregue',
            'preparando'
        )

        expect(resultado).toBe(false)
    })

})
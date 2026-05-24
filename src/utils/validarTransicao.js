function validarTransicaoStatus(statusAtual, novoStatus) {

    const transicoesPermitidas = {
        pendente: ['preparando', 'cancelado'],
        preparando: ['saiu_entrega'],
        saiu_entrega: ['entregue'],
        entregue: [],
        cancelado: []
    }

    return transicoesPermitidas[statusAtual]?.includes(novoStatus)
}

export default validarTransicaoStatus
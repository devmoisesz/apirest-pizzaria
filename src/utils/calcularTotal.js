function calcularTotalPedido(itens) {
    return itens.reduce((acc, item) => 
        acc + (item.quantity * item.unit_price), 0)
}

export default calcularTotalPedido
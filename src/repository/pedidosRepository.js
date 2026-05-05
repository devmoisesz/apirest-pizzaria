import pool from '../../database/db.js'

const buscaUsuario = async(id)=>{
    const {rows} = await pool.query(
        'SELECT id FROM users WHERE id = $1',
        [id]
    )
    return rows[0]
}

const buscaEndereco = async (id)=>{
    const {rows} = await pool.query(
        'SELECT id FROM enderecos WHERE id = $1',
        [id]
    )
    return rows[0]
}

const buscaProduto = async (id)=>{
    const {rows} = await pool.query(
        'SELECT * FROM products WHERE id = $1',
        [id]
    )
    return rows[0]
}

async function Criarpedido(user_id, endereco_id, itens) {
    const {rows} = await pool.query(
        'INSERT INTO pedidos (user_id, endereco_id) VALUES ($1, $2) RETURNING *',
        [user_id, endereco_id]
    )
    const pedido = rows[0]
    await Promise.all(itens.map(async (item) => {
        await pool.query(
            'INSERT INTO order_itens (order_id, product_id, quantity, unit_price) VALUES ($1, $2, $3, $4) RETURNING *',
            [pedido.id, item.product_id, item.quantity, item.unit_price]
       )
    }))
    const total = itens.reduce((acc, item) => acc + (item.quantity * item.unit_price), 0)
    const {rows: pedidoAtualizado} = await pool.query(
        'UPDATE pedidos SET total = $1 WHERE id = $2 RETURNING *',
        [total, pedido.id]
    )
    return pedidoAtualizado[0]
}

async function BuscarPedidos() {
    const {rows} = await pool.query(
        'SELECT * FROM pedidos JOIN order_itens ON pedidos.id = order_itens.order_id JOIN products ON order_itens.product_id = products.id'
    )
    return rows
}



export default {buscaUsuario, buscaEndereco, buscaEndereco, Criarpedido, BuscarPedidos}
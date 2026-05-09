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
    const {rows} = await pool.query(`
        SELECT 
            pedidos.id,
            pedidos.user_id,
            pedidos.status,
            pedidos.total,
            pedidos.created_at,
            json_agg(json_build_object(
                'product_id', order_itens.product_id,
                'name_product', products.name_product,
                'quantity', order_itens.quantity,
                'unit_price', order_itens.unit_price
            )) AS itens
        FROM pedidos
        JOIN order_itens ON pedidos.id = order_itens.order_id
        JOIN products ON order_itens.product_id = products.id
        GROUP BY pedidos.id
    `)
    return rows
}

async function PedidosDoUsuario(id) {
    //junta a tabela pedidos onde o id do usuário for igual ao user_id do pedido
    const {rows} = await pool.query(`
        SELECT
            users.id,
            users.nome,
            json_agg(json_build_object(
                'user_id', pedidos.user_id,
                'status', pedidos.status,
                'total', pedidos.total,
                'endereco_id', pedidos.endereco_id,
                'product_id', order_itens.product_id,
                'name_product', products.name_product,
                'quantity', order_itens.quantity,
                'unit_price', order_itens.unit_price
            )) AS pedido
        FROM users
        JOIN pedidos ON users.id = pedidos.user_id
        JOIN order_itens ON pedidos.id = order_itens.order_id
        JOIN products ON order_itens.product_id = products.id
        WHERE pedidos.user_id = $1
        GROUP BY users.id
    `,[id])
    return rows
}

async function buscarId(id) {
    const {rows} = await pool.query(
        'SELECT id FROM pedidos WHERE id = $1',
        [id]
    )
    return rows[0]
}

async function buscarPedido(id) {
    const {rows} = await pool.query(`
        SELECT 
            pedidos.id,
            pedidos.user_id,
            pedidos.status,
            pedidos.total,
            pedidos.created_at,
            json_agg(json_build_object(
                'product_id', order_itens.product_id,
                'name_product', products.name_product,
                'quantity', order_itens.quantity,
                'unit_price', order_itens.unit_price
            )) AS itens
        FROM pedidos
        JOIN order_itens ON pedidos.id = order_itens.order_id
        JOIN products ON order_itens.product_id = products.id
        WHERE pedidos.id = $1 
        GROUP BY pedidos.id
    `,[id])
    return rows[0]
}

async function EditarPedido(id, status) {
    const {rows} = await pool.query(`
        UPDATE pedidos SET status = $1 WHERE pedidos.id = $2 RETURNING *`,
        [status, id]
    )
    return rows[0]
}

async function DeletarProduto(id) {
    const {rows} = await pool.query(`
        DELETE FROM pedidos WHERE pedidos.id = $1
    `,[id])
    return rows[0]
}

async function statusPendente(id) {
    const {rows} = await pool.query(`
        SELECT pedidos.status FROM pedidos
        WHERE pedidos.id = $1    
    `,[id])
    return rows[0]
}

export default {buscaUsuario, buscaEndereco, buscaProduto, Criarpedido, BuscarPedidos, buscarId, buscarPedido, EditarPedido, DeletarProduto, statusPendente, PedidosDoUsuario}
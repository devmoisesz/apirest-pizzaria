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

async function BuscarPedidoPorUsuario(id_user, idPedido) {
    const { rows } = await pool.query(`
        SELECT * FROM pedidos WHERE user_id = $1 AND pedidos.id = $2
    `,[id_user, idPedido])
    return rows[0]
}

async function pedidosPorUsuario(user_id, status = null) {
    let query = 'SELECT id, status FROM pedidos WHERE user_id = $1'
    let params = [user_id]
    
    if (status) {
        query += ' AND status = $2'
        params.push(status)
    }
    
    const {rows} = await pool.query(query, params)
    return rows
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

async function ListarHistorico(idCliente) {
    const {rows} = await pool.query(`
        SELECT
            products.name_product,
            order_itens.quantity,
            pedidos.total,
            pedidos.status
        FROM pedidos
        JOIN order_itens ON pedidos.id = order_itens.order_id
        JOIN products ON order_itens.product_id = products.id
        WHERE user_id = $1
        AND (pedidos.status = 'entregue' OR pedidos.status = 'cancelado')
        GROUP BY products.name_product, order_itens.quantity, pedidos.total, pedidos.status
    `,[idCliente])
    return rows
}

async function listarPedidoCliente(idCliente, idPedido) {
    const {rows} = await pool.query(`
       SELECT
            products.name_product,
            order_itens.quantity,
            pedidos.total,
            pedidos.status
        FROM pedidos
        JOIN order_itens ON pedidos.id = order_itens.order_id
        JOIN products ON order_itens.product_id = products.id
        WHERE pedidos.user_id = $1 
        AND pedidos.id = $2
        GROUP BY products.name_product, order_itens.quantity, pedidos.total, pedidos.status
    `,[idCliente, idPedido])
    return rows[0]
}


async function BuscarPedidos() {
    const {rows} = await pool.query(`
        SELECT 
            pedidos.id,
            pedidos.user_id,
            users.nome,
            users.email,
            pedidos.status,
            pedidos.total,
            enderecos.rua,
            enderecos.bairro,
            enderecos.cidade,
            pedidos.created_at,
            json_agg(json_build_object(
                'product_id', order_itens.product_id,
                'name_product', products.name_product,
                'quantity', order_itens.quantity,
                'unit_price', order_itens.unit_price
            )) AS itens
        FROM pedidos
        JOIN users ON pedidos.user_id = users.id
        JOIN order_itens ON pedidos.id = order_itens.order_id
        JOIN products ON order_itens.product_id = products.id
        JOIN enderecos ON pedidos.endereco_id = enderecos.id 
        GROUP BY pedidos.id, users.nome, users.email, enderecos.rua, enderecos.bairro, enderecos.cidade
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
            users.nome,
            users.email,
            pedidos.status,
            pedidos.total,
            enderecos.rua,
            enderecos.bairro,
            enderecos.cidade,
            pedidos.created_at,
            json_agg(json_build_object(
                'product_id', order_itens.product_id,
                'name_product', products.name_product,
                'quantity', order_itens.quantity,
                'unit_price', order_itens.unit_price
            )) AS itens
        FROM pedidos
        JOIN users ON pedidos.user_id = users.id
        JOIN order_itens ON pedidos.id = order_itens.order_id
        JOIN products ON order_itens.product_id = products.id
        JOIN enderecos ON pedidos.endereco_id = enderecos.id 
        WHERE pedidos.id = $1 
        GROUP BY pedidos.id, users.nome, users.email, enderecos.rua, enderecos.bairro, enderecos.cidade
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

async function ClienteCancelarPedido(id_user, idPedido) {
    //muda o status do pedido pra 'cancelado'
    const {rows} = await pool.query(`
        UPDATE pedidos
            SET status = 'cancelado'
            WHERE pedidos.id = $1
            AND user_id = $2
            RETURNING *
    `,[idPedido, id_user])
    return rows[0]
}

async function DeletarPedido(id) {
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

export default {buscaUsuario, buscaEndereco, buscaProduto, 
    Criarpedido, ListarHistorico, listarPedidoCliente, 
    BuscarPedidos, buscarId, pedidosPorUsuario, 
    buscarPedido, EditarPedido, BuscarPedidoPorUsuario, 
    ClienteCancelarPedido, DeletarPedido, 
    statusPendente, PedidosDoUsuario
}
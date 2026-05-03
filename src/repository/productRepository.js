import pool from "../../database/db.js";

const buscarPorNome = async(name_product)=>{
    const {rows} = await pool.query(
        'SELECT name_product FROM products WHERE name_product = $1',
        [name_product]
    )
    return rows[0]
}

const cadastrar = async(name_product, price, description, category_id)=>{
    const {rows} = await pool.query(
        'INSERT INTO products (name_product, price, description, category_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [name_product, price, description, category_id]
    )
    return rows[0]
}

const Listar = async()=>{
    const {rows} = await pool.query(
        'SELECT * FROM products'
    )
    return rows
}

const productPorId = async(id)=>{
    const {rows} = await pool.query(
        'SELECT * FROM products WHERE id = $1',
        [id]
    )
    return rows[0]
}

const verificar = async(id)=>{
    const {rows} = await pool.query(
        'SELECT * FROM products WHERE id = $1',
        [id]
    )
    return rows[0]
}

const editarProduto = async(id, name_product, price, description, category_id)=>{
    const {rows} = await pool.query(
        'UPDATE products SET name_product = $1, price = $2, description = $3, category_id = $4 WHERE id = $5 RETURNING *',
        [name_product, price, description, category_id, id]
    )
    return rows[0]
}

const deletarProduto = async(id)=>{
    const {rows} = await pool.query(
        'DELETE FROM products WHERE id = $1',
        [id]
    )
    return rows[0]
}

export default {buscarPorNome, cadastrar, Listar, productPorId, verificar, editarProduto, deletarProduto}
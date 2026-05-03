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

export default {buscarPorNome, cadastrar, Listar}
import pool from "../../database/db.js";

const SelectId = async(id) =>{
    const {rows} = await pool.query(`
        SELECT id FROM categoria WHERE id = $1
    `,[id])
    return rows[0]
}

const buscarPorNome = async(nome)=>{
    const {rows} = await pool.query(
        'SELECT nome FROM categoria WHERE nome = $1',
        [nome]
    )
    return rows[0]
}
const criar = async(nome)=>{
    const {rows} = await pool.query(
        'INSERT INTO categoria (nome) VALUES($1) RETURNING *',
        [nome]
    )
    return rows[0]
}

const listar = async()=>{
    const {rows} = await pool.query(
        'SELECT * FROM categoria'
    )
    return rows
}

const listarPorId = async(id)=>{
    const {rows} = await pool.query(
        'SELECT * FROM categoria WHERE id = $1',
        [id]
    )
    return rows[0]
}

const editar = async(id, up)=>{
    const {rows} = await pool.query(
        'UPDATE categoria SET nome = $1 WHERE id = $2 RETURNING *',
        [up, id]
    )
    return rows[0]
}

const deletarCategoria = async(id)=>{
    const {rows} = await pool.query(
        'DELETE FROM categoria WHERE id = $1',
        [id]
    )
    return rows[0]
}

async function ProdutoDaCategoria(id) {
    const {rows} = await pool.query(`
        SELECT
            categoria.id,
            categoria.nome,
            json_agg(json_build_object(
                'name_product', products.name_product,
                'preço', products.price,
                'descrição', products.description
            )) AS produtos
        FROM categoria
        JOIN products ON categoria.id = products.category_id
        WHERE categoria.id = $1
        GROUP BY categoria.id
    `,[id])
    return rows
}

export default {SelectId, buscarPorNome, criar, listar, listarPorId, editar, deletarCategoria, ProdutoDaCategoria}
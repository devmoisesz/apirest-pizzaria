import pool from "../../database/db.js";

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

export default {buscarPorNome, criar, listar, listarPorId, editar, deletarCategoria}
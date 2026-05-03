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

export default {buscarPorNome, criar}
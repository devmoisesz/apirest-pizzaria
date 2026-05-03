import pool from "../../database/db.js";

async function buscarPorEmail(email){
    const {rows} = await pool.query(
        'SELECT email FROM users WHERE email = $1',
        [email]
    )
    return rows[0]
}
const criar = async({nome, email}) => {
    const {rows} = await pool.query(
        'INSERT INTO users (nome, email, date_creation) VALUES ($1, $2, CURRENT_TIMESTAMP) RETURNING *',
        [nome, email]
    )
    return rows[0]
}

const listar = async() =>{
    const {rows} = await pool.query(
        'SELECT * FROM users'
    )
    return rows
}

const buscarPorId = async(id) =>{
    const {rows} = await pool.query(
        'SELECT * FROM users WHERE id = $1',
        [id]
    )
    return rows[0]
}

const editaUser = async(id, up) =>{
    const {rows} = await pool.query(
        'UPDATE users SET nome = $1, email = $2 WHERE id = $3 RETURNING *',
        [up.nome, up.email, id]
    )
    return rows[0]
}

const delect = async(id) => {
    const {rows} = await pool.query(
        'DELETE FROM users WHERE id = $1',
        [id]
    )
    return rows[0]
}

export default {buscarPorEmail, criar, listar, buscarPorId, editaUser, delect}
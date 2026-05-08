import pool from "../../database/db.js";

async function BuscarIDdoUsuario(id) {
    const {rows} = await pool.query(`
       SELECT id FROM users WHERE id = $1
    `,[id])
    return rows[0]
}

async function CadastrarEnderecos(user_id, cidade, rua, numero, bairro, complemento, cep) {
    const {rows} = await pool.query(`
        INSERT INTO enderecos(user_id, cidade, rua, numero, bairro, complemento, cep)
        VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *
    `,[user_id, cidade, rua, numero, bairro, complemento, cep])
    return rows[0]
}


export default {BuscarIDdoUsuario, CadastrarEnderecos}
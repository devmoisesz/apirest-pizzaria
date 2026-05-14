//Repository consulta o banco pra atender as requisições do usuário
import pool from "../../database/db.js";

//rows é um array que guarda o resultado da consulta SQL

async function buscarPorEmail(email){
    //Busca email pra verificação de email já cadastrado
    const {rows} = await pool.query(
        'SELECT email FROM users WHERE email = $1',
        [email]
    )
    return rows[0]
}

async function BuscarUsuario(email) {
    const {rows} = await pool.query(`
        SELECT * FROM users WHERE email = $1
    `,[email])
    return rows[0]
}

const criar = async({nome, email, senha}) => {
    //Cadastrada as informações do usuário no banco, com a data de criação 
    const {rows} = await pool.query(
        'INSERT INTO users (nome, email, senha, date_creation) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING id, nome, email, date_creation',
        [nome, email, senha]
    )
    return rows[0]
}

const listar = async() =>{
    //Lista todos usuários cadastrados
    const {rows} = await pool.query(
        'SELECT * FROM users'
    )
    return rows
}

const buscarPorId = async(id) =>{
    //Lista apenas usuário requisitado pelo id
    const {rows} = await pool.query(`
        SELECT nome, email FROM users WHERE id = $1
        `,[id])
    return rows[0]
}

async function buscarPorIdCompleto(id) {
    const {rows} = await pool.query(
        'SELECT * FROM users WHERE id = $1', [id]
    )
    return rows[0]
}

async function EnderecoDoUsuario(id) {
    const {rows} = await pool.query(`
        SELECT
            users.id,
            users.nome,
            json_agg(json_build_object(
                'cidade', enderecos.cidade,
                'rua', enderecos.rua,
                'numero', enderecos.numero,
                'bairro', enderecos.bairro,
                'complemento', enderecos.complemento,
                'cep', enderecos.cep
            )) AS endereço
        FROM users
        JOIN enderecos ON users.id = enderecos.user_id
        WHERE users.id = $1
        GROUP BY users.id
    `,[id])
    return rows[0]
}

async function EditarPerfil(id, {nome, email, senha}) {

    //Caso usúario edite a senha
    if(senha){
        const {rows} = await pool.query(`
            UPDATE users
            SET nome = $1, email = $2, senha = $3
            WHERE id = $4 
            RETURNING nome, email
        `,[nome, email, senha, id])
        return rows[0]
    }

    //Caso não edite a senha
    const {rows} = await pool.query(`
        UPDATE users
        SET nome = $1, email = $2
        WHERE id = $3
        RETURNING nome, email    
    `,[nome,email,id])
    return rows[0]
}

const editaUser = async(id, up) =>{
    //Atualiza dados do usuário
    const {rows} = await pool.query(
        'UPDATE users SET nome = $1, email = $2, senha = $3 WHERE id = $4 RETURNING *',
        [up.nome, up.email, up.senha, id]
    )
    return rows[0]
}

const delect = async(id) => {
    //Deleta Usuários
    const {rows} = await pool.query(
        'DELETE FROM users WHERE id = $1',
        [id]
    )
    return rows[0]
}



export default {buscarPorEmail, BuscarUsuario, criar, listar, buscarPorId, buscarPorIdCompleto, EnderecoDoUsuario, EditarPerfil, editaUser, delect}
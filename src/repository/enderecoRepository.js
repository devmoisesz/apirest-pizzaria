import pool from "../../database/db.js";

async function BuscarIDdoUsuario(id) {
    const {rows} = await pool.query(`
       SELECT id FROM users WHERE id = $1
    `,[id])
    return rows[0]
}

async function BuscarIDdoEndereco(id) {
    const {rows} = await pool.query(`
        SELECT id FROM enderecos WHERE id = $1    
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

async function ListarEnderecos() {
    const {rows} = await pool.query(`
        SELECT * FROM enderecos
    `)
    return rows
}

async function ListarEndereco(id) {
    const {rows} = await pool.query(`
        SELECT * FROM enderecos WHERE id = $1
    `,[id])
    return rows[0]
}

async function ListarEnderecoGerenciado(idUser) {
     const {rows} = await pool.query(`
        SELECT * FROM enderecos WHERE user_id = $1
    `,[idUser])
    return rows
}

//Edita endereço de acordo com a condição(id do endereço seja X e também o user_id seja Y)
async function EditarEnderecoGerenciado(idUser, idEndereco, cidade, rua, numero, bairro, complemento, cep) {
    const {rows} = await pool.query(`
        UPDATE 
            enderecos SET 
            cidade = $1, 
            rua = $2, 
            numero = $3, 
            bairro = $4, 
            complemento = $5, 
            cep = $6
        WHERE id = $7 AND user_id = $8 RETURNING *
    `,[cidade, rua, numero, bairro, complemento, cep, idEndereco, idUser])
    return rows[0]
}

async function EditarEndereco(id, cidade, rua, numero, bairro, complemento, cep) {
    const {rows} = await pool.query(`
        UPDATE enderecos SET cidade = $1, rua = $2, numero = $3, bairro = $4, complemento = $5, cep = $6
        WHERE id = $7 RETURNING *
    `,[cidade, rua, numero, bairro, complemento, cep, id])
    return rows[0]
}

async function DeletarEnderecoGenciado(idUsuario, idEndereco) {
    const {rows} = await pool.query(`
        DELETE 
            FROM enderecos
            WHERE enderecos.id = $1
            AND user_id = $2
    `,[idEndereco, idUsuario])
    return rows[0]
}

async function DeletarEndereco(id) {
    const {rows} = await pool.query(`
        DELETE FROM enderecos WHERE id = $1
    `,[id])
    return rows[0]
}

export default {BuscarIDdoUsuario, 
    CadastrarEnderecos, ListarEnderecos, 
    ListarEnderecoGerenciado, BuscarIDdoEndereco, 
    ListarEndereco, EditarEnderecoGerenciado, 
    EditarEndereco, DeletarEnderecoGenciado, 
    DeletarEndereco
}
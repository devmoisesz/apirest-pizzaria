//Repository consulta o banco pra atender as requisições do usuário
import { includes } from "zod";
import pool from "../../database/db.js";

//rows é um array que guarda o resultado da consulta SQL

//Busca nome do produto requisitado pro service fazer a verificação
const buscarPorNome = async(name_product)=>{
    const {rows} = await pool.query(
        'SELECT name_product FROM products WHERE name_product = $1',
        [name_product]
    )
    return rows[0]
}

//Cadastra o novo produto requisitado no banco
const cadastrar = async(name_product, price, description, category_id)=>{
    const {rows} = await pool.query(
        'INSERT INTO products (name_product, price, description, category_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [name_product, price, description, category_id]
    )
    return rows[0]
}

async function ListarProdutoFiltrado(nomeProdutoUrl) {
    //Adiciona % antes e depois do nome para buscar produtos que contenham o texto informado
    nomeProdutoUrl = "%" + nomeProdutoUrl + "%"
    const {rows} = await pool.query(`
        SELECT
            name_product, 
            price, 
            description, 
            json_agg(json_build_object(
                'nome', categoria.nome
            )) AS categoria
        FROM products
        JOIN categoria ON categoria.id = products.category_id
        WHERE name_product ILIKE $1
        GROUP BY name_product, price, description, category_id
    `,[nomeProdutoUrl])
    return rows
}

//Lista todos os produtos cadastrados
const Listar = async()=>{
    const {rows} = await pool.query(`
        SELECT 
            products.id,
            name_product, 
            price, 
            description, 
            json_agg(json_build_object(
                'nome', categoria.nome
            )) AS categoria
        FROM products
        JOIN categoria ON categoria.id = products.category_id
        GROUP BY products.id, name_product, price, description, category_id
    `)
    return rows
}

//Lista apenas o produto requisitado
const productPorId = async(id)=>{
    const {rows} = await pool.query(
        'SELECT * FROM products WHERE id = $1',
        [id]
    )
    return rows[0]
}

//Edita o produto requisitado
const editarProduto = async(id, name_product, price, description, category_id)=>{
    const {rows} = await pool.query(
        'UPDATE products SET name_product = $1, price = $2, description = $3, category_id = $4 WHERE id = $5 RETURNING *',
        [name_product, price, description, category_id, id]
    )
    return rows[0]
}


//Deleta o produto requisitado
const deletarProduto = async(id)=>{
    const {rows} = await pool.query(
        'DELETE FROM products WHERE id = $1',
        [id]
    )
    return rows[0]
}

export default {buscarPorNome, cadastrar, ListarProdutoFiltrado, Listar, productPorId, editarProduto, deletarProduto}
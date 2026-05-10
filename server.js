import express from 'express'
import usersRoutes from './src/route/usersRoutes.js'
import productRoutes from './src/route/productRoutes.js'
import categoryRoutes from './src/route/categoryRoutes.js'
import pedidosRoutes from './src/route/pedidosRoutes.js'
import enderecoRoutes from './src/route/enderecoRoutes.js'
import loginRoutes from './src/route/loginRoutes.js'
import errorMiddleware from './src/middlewares/errorMiddleware.js'

const server = express()
server.use(express.json())

server.use('/usuarios', usersRoutes) //Servidor de Usuários 

server.use('/produtos', productRoutes) // Servidor de Produtos

server.use('/categoria', categoryRoutes) // Servidor de Categoria

server.use('/pedidos', pedidosRoutes) // Servidor de Pedidos

server.use('/enderecos', enderecoRoutes) // Servidor de Endereços

server.use('/login', loginRoutes) // Servidor de Login

server.use(errorMiddleware.errosGlobais) // Servidor pra tratar erros globais

server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})
import express from 'express'
import usersRoutes from './src/route/usersRoutes.js'
import productRoutes from './src/route/productRoutes.js'
import categoryRoutes from './src/route/categoryRoutes.js'

const server = express()
server.use(express.json())

server.use('/usuarios', usersRoutes) //Rotas de Usuários 

server.use('/produtos', productRoutes) // Rotas de Produtos

server.use('/categoria', categoryRoutes) // Rotas de Categoria

server.listen(3001, () => {
    console.log('Server running on port 3001')
})
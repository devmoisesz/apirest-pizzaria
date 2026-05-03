import express from 'express'
import usersRoutes from './src/route/usersRoutes.js'
import categoryRoutes from './src/route/categoryRoutes.js'

const server = express()
server.use(express.json())

server.use('/usuarios', usersRoutes)

//server.use('/produtos', productRoutes)

server.use('/categoria', categoryRoutes)

server.listen(3001, () => {
    console.log('Server running on port 3001')
})
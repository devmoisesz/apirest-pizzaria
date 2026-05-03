import express, { json } from 'express'
import usersRoutes from './src/route/usersRoutes'

const server = express()
server.use(express.json())

server.use('/usuarios', usersRoutes)

server.listen(3001, () => {
    console.log('Server running on port 3001')
})
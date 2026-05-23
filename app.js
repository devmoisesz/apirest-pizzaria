import express from 'express'
import usersRoutes from './src/route/usersRoutes.js'
import productRoutes from './src/route/productRoutes.js'
import categoryRoutes from './src/route/categoryRoutes.js'
import pedidosRoutes from './src/route/pedidosRoutes.js'
import enderecoRoutes from './src/route/enderecoRoutes.js'
import loginRoutes from './src/route/loginRoutes.js'
import errorMiddleware from './src/middlewares/errorMiddleware.js'

const app = express()

app.use(express.json())

app.use('/usuarios', usersRoutes)

app.use('/produtos', productRoutes)

app.use('/categoria', categoryRoutes)

app.use('/pedidos', pedidosRoutes)

app.use('/enderecos', enderecoRoutes)

app.use('/login', loginRoutes)

app.use(errorMiddleware.errosGlobais)

export default app
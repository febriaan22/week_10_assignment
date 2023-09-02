require('dotenv').config()

const express = require('express')
// const cors = require('cors')
const databaseMiddleware = require('./middleware/database-middleware.js')
const transferRouter = require('./routes/transferRouter.js')
const userRouter = require('./routes/userRouter.js')
const authMiddleware = require('./middleware/authentication-middleware.js')
const openApiValidator = require('express-openapi-validator')
const swaggerUi = require('swagger-ui-express')
const yaml = require('yaml')
const bodyParser = require('body-parser')


const app = express()

// app.use(cors())
app.use(bodyParser.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(yaml.parse(require('fs').readFileSync('./docs/doc.yaml', 'utf8'))))
app.use(openApiValidator.middleware({
    apiSpec: './docs/doc.yaml'
}))
app.use(databaseMiddleware)


app.get('/', (req, res) => {
    res.send('Assignment Week 10')
});

app.use('/transfer', authMiddleware, transferRouter)
// /transfer -> transferRouter
/**
    transferRouter.get('/', authorizationMiddleware, getAllTransfers)
    transferRouter.post('/', authorizationMiddleware, createTransfers)
    transferRouter.patch('/:id', authorizationMiddleware, updateTransfers)
 */

// GET /transfer/ -> /transfer
// POST /transfer/
// PATCH /transfer/:id


app.use('/user', userRouter) // path.   {group-path} + {per-router-path}

// localhost:3000/user -> userRouter
/**
    userRouter.post('/register', register)
    userRouter.post('/login', login)
 */
// POST /user/register
// POST /user/login



app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
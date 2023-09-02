const { Router } = require('express')
const { getAllTransfers, createTransfers, updateTransfers } = require('../Service/transferService.js')
const authorizationMiddleware = require('../middleware/authorization-middleware.js')

const transferRouter = Router()

transferRouter.get('/', authorizationMiddleware, getAllTransfers)
transferRouter.post('/', authorizationMiddleware, createTransfers)
transferRouter.patch('/:id', authorizationMiddleware, updateTransfers)

module.exports = transferRouter
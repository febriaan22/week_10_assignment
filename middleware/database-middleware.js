const { MongoClient } = require('mongodb')

const databaseMiddleware = async (req, res, next) => {
  const mongoClient = await new MongoClient('mongodb+srv://febrian22:Newromantics@cluster0.1grckzt.mongodb.net/?retryWrites=true&w=majority').connect()
  db = mongoClient.db('ArianaGrande')
  
  req.db = db
  
  next()
}

module.exports = databaseMiddleware
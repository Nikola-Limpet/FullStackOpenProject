require('dotenv').config()

const PORT = process.env.PORT
const MONGO_DB_URI = process.env.MONGO_DB_URI

module.exports = {
  MONGO_DB_URI,
  PORT
}
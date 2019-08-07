const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = process.env.PORT || '8080'

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.post('/start', db.scraperStart)
app.post('/end', db.scraperEnd)


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
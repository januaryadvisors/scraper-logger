const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./routes/index.js')
const port = process.env.PORT || '3000'

app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', db.getScraperLog)
app.post('/start', db.scraperStart)
app.post('/end', db.scraperEnd)


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
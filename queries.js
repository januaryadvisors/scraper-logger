var dotenv = require('dotenv');

dotenv.config();

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DBNAME,
  password: process.env.DBPASSWORD,
  //port: 5432,
})


const scraperStart = (request, response) => {
  console.log(request.body)
  const { name, start_time } = request.body

  pool.query('INSERT INTO scraper_log (name, start_time) VALUES ($1, $2) RETURNING id', [name, start_time], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`${results.rows[0].id}\n`)
  })
}

const scraperEnd = (request, response) => {
  const { end_time, status, id } = request.body
  pool.query('UPDATE scraper_log SET end_time = ($1), status = ($2) WHERE id = ($3)', [end_time, status, id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`End data updated.`)
  })
}

module.exports = {
  scraperStart,
  scraperEnd
}
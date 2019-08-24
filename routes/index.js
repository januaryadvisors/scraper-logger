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

const getScraperLog = (request, response) => {
  pool.query('SELECT * FROM scraper_log ORDER BY start_time DESC', (error, results) => {
    if (error) {
      throw error
    }
    console.log(results)
    response.render('index.ejs',{
      logs: results.rows
    })
  })
}

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
  const { end_time, status, id, full_log } = request.body
  pool.query('UPDATE scraper_log SET end_time = ($1), status = ($2), full_log = ($3) WHERE id = ($4)', [end_time, status, full_log, id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`End data updated.`)
  })
}

module.exports = {
  getScraperLog,
  scraperStart,
  scraperEnd
}
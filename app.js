const express = require('express')
const app = express()
app.use(express.json())
const path = require('path')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')

const dbpath = path.join(__dirname, 'cricketTeam.db')

let db = null

const initlizeServer = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    })

    app.listen(3000, () => {
      console.log('server running')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}

initlizeServer()

//Get all players in the team

app.get('/players/', async (req, res) => {
  const getPlayerListQuery = `
  SELECT * FROM
   cricket_team`
  const playerArray = await db.all(getPlayerListQuery)
  res.send(playerArray)
})

module.exports = app

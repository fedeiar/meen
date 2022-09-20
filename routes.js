const express = require('express')
const { insertItem,  getPelis, getPelisHardcodeado, putCincoPelisRandom } = require('./db')

const router = express.Router()

router.get('/public',(req,res) => {
  res.sendFile(__dirname + "/public");
})

// Obtener las peliculas solicitadas
router.get('/peliculas/:term', (req, res) => {
  getPelis(req.params.term)
    .then((items) => {
      items = items.map((item) => ({
        title: item.title,
        year: item.year,
        imdb: item.imdb,
        tomatoes: item.tomatoes,
        poster: item.poster
      }))
      res.json(items)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
})

// Obtener las peliculas hardcodeadas
router.get('/peliculas_hardcodeadas', (req, res) => {
    getPelisHardcodeado()
      .then((items) => {
        items = items.map((item) => ({
          title: item.title,
          year: item.year,
          imdb: item.imdb,
          tomatoes: item.tomatoes,
          poster: item.poster
        }))
        res.json(items)
      })
      .catch((err) => {
        console.log(err)
        res.status(500).end()
      })
})

// Postear una pelicula
router.post('/peliculas', (req, res) => {
  let message = putCincoPelisRandom();
  res.status(200).send(message);
})


module.exports = router

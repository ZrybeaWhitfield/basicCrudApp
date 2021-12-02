const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
MongoClient.connect('mongodb+srv://demo:1234@cluster0.yvuyn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useUnifiedTopology: true})
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.set('view engine', 'ejs')


    app.get('/', (req, res) => {
      db.collection('quotes').find().toArray()
        .then(results => {
          console.log(results)
          res.render('index.ejs', {quotes: results})
        })
        .catch(error => console.error(error))
    })


    app.post('/quotes', (req, res) => {
      quotesCollection.insertOne(req.body)
    .then(result => {
      res.redirect('/')
    })
    .catch(error => console.error(error))
    })
    app.listen(3030, function() {
      console.log('listening on 3030')
    })
  })
  .catch(error => console.error(error))

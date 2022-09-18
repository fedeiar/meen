const { MongoClient, ObjectId } = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1:27017'
const dbName = 'peliculas'

let db

const init = () =>
  MongoClient.connect(connectionUrl, { useNewUrlParser: true }).then((client) => {
    db = client.db(dbName)
  })

const insertItem = (item) => {
  const collection = db.collection('movies')
  return collection.insertOne(item)
}


const getPelis = (term) => {
  const filter = [
    { 'title': {$regex: term} },
    { 'fullplot': {$regex: term}},
    { 'cast': {$regex: term}}
  ]
  const projection = {
    'title': 1,
    'year': 1,
    'imdb': 1,
    'tomatoes': 1,
    'poster': 1,
    '_id': 0
  };
  const coll = db.collection('movies');
  const cursor = coll.find({"$or":filter}, { projection });
  const result = cursor.toArray();
  return result;
}

const getPelisHardcodeado = () => {
    const filter = { cast : {$in : ["Adam Sandler","Jim Carrey"]} , year : {$gte : 1995 , $lte : 2000}  , fullplot : {$regex : /father/}};

    const projection = {
        'title': 1,
        'year': 1,
        'imdb': 1,
        'tomatoes': 1,
        'poster': 1,
        '_id': 0
    };

    const coll = db.collection('movies');
    const cursor = coll.find(filter, { projection });
    const result = cursor.toArray();
    return result;
}


const putCincoPelisRandom = () => {

    const coll = db.collection('movies');
    const cursor = coll.aggregate([
      {
        '$sample': {
          'size': 5
        }
      }, {
        '$project': {
          '_id': 0, 
          'title': 1, 
          'cast': 1, 
          'fullplot': 1, 
          'poster': 1, 
          'year': 1
        }
      }
    ]);
    const peliculasRandom = cursor.toArray()
    .then(function(items){
        console.log(items[3].poster);

        // TODO: preguntar: está bien insertarlo aca o hay que insertarlo en otro lado?
        // TODO: hacemos controles de nulos?
        coll.insertOne({
            "title": "TADW Presenta: "+items[0].title,
            "cast": items[1].cast,
            "fullplot": items[2].fullplot,
            "poster": items[3].poster,
            "year": items[4].year
        });
    });

    
    return "ok!"
}

module.exports = { init, insertItem, getPelis, getPelisHardcodeado, putCincoPelisRandom }

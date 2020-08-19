const db = require('../config/mongo');
const Movie = db.collection("movies");
const { ObjectID } = require('mongodb');

class MovieModel {
  static find() {
    return Movie.find().toArray();
  }

  static findOne(id) {
    return Movie.findOne({ _id: ObjectID(id) });
  }

  static insert(newMovie) {
    return Movie.insertOne(newMovie);
  }

  static updateOne(id, newData) {
    return Movie.findOneAndUpdate(
      { _id: ObjectID(id) },
      { $set: newData},
      { returnOriginal: false }
    )
  }

  static deleteOne(id) {
    return Movie.findOneAndDelete({ _id: ObjectID(id)});
  }
}

module.exports = MovieModel;
const db = require('../config/mongo');
const Series = db.collection("series");
const { ObjectID } = require('mongodb');

class SeriesModel {
  static find() {
    return Series.find().toArray();
  }

  static findOne(id) {
    return Series.findOne({ _id: ObjectID(id) });
  }

  static insert(newSeries) {
    return Series.insert(newSeries);
  }

  static updateOne(id, newData) {
    return Series.findOneAndUpdate(
      { _id: ObjectID(id) },
      { $set: newData},
      { returnOriginal: false }
    )
  }

  static deleteOne(id) {
    return Series.findOneAndDelete({ _id: ObjectID(id)});
  }
}

module.exports = SeriesModel;
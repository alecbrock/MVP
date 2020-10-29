const mongoose = require('mongoose');
const db = 'mongodb://127.0.0.1:27017/MVP';

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true,
});

const dataBase = mongoose.connection;
dataBase.on('error', console.error.bind(console, 'connection error'));
dataBase.once('open', () => {
  console.log('database is connected')
});

let gamesSchema = new mongoose.Schema({});

const Games = mongoose.model('Games', gamesSchema, 'games');



module.exports = {Games, dataBase};
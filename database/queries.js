const mongoose = require('mongoose');
const { Games, dataBase } = require('./index.js');

const insertManyGame = (array) => {
  return new Promise((resolve, reject) => {
    dataBase.db.collection('games', function (err, collection) {
      collection.insertMany(array, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      })
    })
  })
};

const insertOneGame = (obj) => {
  return new Promise((resolve, reject) => {
    dataBase.db.collection('games', function (err, collection) {
      collection.insertOne(obj, (error, results) => {
        if (error) {
          reject(error);
        } else {
          console.log('document inserted');
          resolve(results);
        }
      })
    })
  })
};

const findGame = (string) => {
  return new Promise((resolve, reject) => {
    Games.findOne({slug: string}, (error, results) => {
      if(error) {
        reject(error);
      } else {
        resolve(results);
      }
    })
  })
};

module.exports = { insertManyGame, findGame, insertOneGame }


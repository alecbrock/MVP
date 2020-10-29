const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const request = require('request');
const fs = require('fs');
const { insertManyGame, findGame, insertOneGame } = require('../database/queries.js');
const header = {
  "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
  "x-rapidapi-key": "da04674c9fmshdf0ed79a8670399p1cceeejsna4dc124ff25c",
  "useQueryString": true
};

const ETL = async _ => {
  console.log('started');
  let result = [];
  for (var i = 2; i < 100; i++) {
    console.log(i);
    const gameList = await wait({ method: 'GET', headers: header, url: `https://api.rawg.io/api/games?page=${i}`, qs: { ordering: '-rating', page_size: 10 } })
    let formatted = JSON.parse(JSON.stringify(gameList));
    for (var j = 0; j < formatted.results.length - 1; j++) {
      const singleGame = await wait({ method: 'GET', headers: header, url: `https://rawg-video-games-database.p.rapidapi.com/games/${formatted.results[j].slug}` })
      let formattedGame = JSON.parse(JSON.stringify(singleGame));
      result.push(formattedGame);
    }
  }
  insertManyGame(result)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    })
}
// ETL();

async function wait(input) {
  function RawgRequest() {
    return new Promise((resolve, reject) => {
      request(input, (error, response, body) => {
        try {
          resolve(JSON.parse(body))
        } catch (e) {
          reject(e)
        }
      })
    })
  }
  try {
    result = await RawgRequest();
  } catch (e) {
    console.error(e)
  }
  return result;
}



function routing() {
  var app = express();
  app.use(express.static(__dirname + '/../react-client/dist'));

  app.get('/videoGameList/:id', async (req, res) => {
    const id = req.params.id;
    const games = await wait({ method: 'GET', headers: header, url: `https://api.rawg.io/api/games?page=${id}`, qs: { ordering: '-rating', page_size: 10 } });
    let arr = [];
    let document = [];
    const gameDetails = async () => {
      return Promise.all(games.results.map((x, i) => {
        return findGame(x.slug)
          .then((result) => {
            if (result === null) {
              arr.push(i);
              return wait({ method: 'GET', headers: header, url: `https://rawg-video-games-database.p.rapidapi.com/games/${x.slug}` })
            } else {
              return result;
            }
          })
      }))
    }
    gameDetails()
      .then((data) => {
        document = data;
        res.json(data);
      })
      .then(() => {
        if (arr.length > 0) {
          arr.map((x) => {
            insertOneGame(document[x])
          })
        }
      })
      .catch((err) => {
        console.error(err);
      })
  })

  app.get('/search', async (req, res) => {
    var document = [];
    findGame(req.query.name.split(' ').join('-').toLowerCase())
      .then((data) => {
        if (data === null) {
          searchGame.url = `https://rawg-video-games-database.p.rapidapi.com/games/` + req.query.name.split(' ').join('-').toLowerCase();
          wait(searchGame)
            .then((data2) => {
              document = data2;
              res.json(data2)
            })
            .then(() => {
              insertOneGame(document);
            })

        } else {
          res.json(data);
        }
      })
  })

  app.get('/videoGameList/sort/:id', async (req, res) => {
    let id = req.params.id;
    let sortString = req.query.sort;
    let category = req.query.category;
    console.log(id, category, sortString)
    let sorted = await wait({ method: 'GET', headers: header, url: `https://rawg-video-games-database.p.rapidapi.com/${category}?page=${id}`, qs: { count: 100, page_size: 100 } })
    let arr = [];

    sorted.results.map((x) => {
      if (x.slug === sortString) {
        arr = x.games;
      }
    })
    let collect = [];
    let document = [];
    const gameDetails = async () => {
      return Promise.all(arr.map((y, i) => {
        return findGame(y.slug)
          .then((data) => {
            if (data === null) {
              collect.push(i)
              return wait({ method: 'GET', headers: header, url: `https://rawg-video-games-database.p.rapidapi.com/games/${y.slug}` })
            } else {
              return data;
            }
          })
      }))
    }
    gameDetails()
      .then((data) => {
        document = data;
        res.json(data);
      })
      .then(() => {
        if (collect.length > 0) {
          collect.map((z) => {
            insertOneGame(document[z])
          })
        }
      })
      .catch((err) => {
        console.error(err)
      })
  })




  app.listen(3000, function () {
    console.log('listening on port 3000!');
  });
}
routing();


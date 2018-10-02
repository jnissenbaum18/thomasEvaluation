var express = require('express');
var router = express.Router();

var db = require('../db/index.js');
var restaurant = require('../db/models/restaurant');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  var body = {
    searchText: "10022",
    pageNumber: 1,
    pageSize: 10
  }

  if (req.query.page) {
    body.pageNumber = req.query.page
  }

  if (req.query.searchText) {
    const queryString = '\"' + req.query.searchText.split(' ').join('\" \"') + '\"'; 
    body.searchText = queryString;
  }

  console.log('search ', body.searchText)

  try {

    let searchResult;

    if (body.searchText) {
      searchResult = await restaurant.find({ 
        $text: { 
          $search: body.searchText
        } 
      })
      .limit(body.pageSize)
      .skip((body.pageNumber - 1) * body.pageSize);
    } else {
      
    }
    res.status(200).json(searchResult);
  } catch (e) {
    console.error(e);
    return res.status(500).send(e);
  }

});

module.exports = router;

var express = require('express');
var router = express.Router();

var restaurant = require('../db/models/restaurant');

/* GET restaurant listing. */
router.get('/', async (req, res, next) => {
  let searchParams = {}

  if (req.query.pageNumber) {
    searchParams.pageNumber = Number(req.query.pageNumber);
  }

  if (req.query.pageSize) {
    searchParams.pageSize = Number(req.query.pageSize);
  }

  if (req.query.searchText) {
    const queryString = '\"' + req.query.searchText.split(' ').join('\" \"') + '\"'; 
    searchParams.searchText = queryString;
  }

  console.log(`Query DB, searchText: ${searchParams.searchText}, pageNumber: ${searchParams.pageNumber}, pageSize: ${searchParams.pageSize}`)

  try {
    let searchResult;
    
    if (searchParams.searchText) {
      searchResult = await restaurant.find({ 
        $text: { 
          $search: searchParams.searchText
        } 
      })
      .limit(searchParams.pageSize)
      .skip((searchParams.pageNumber - 1) * searchParams.pageSize);
    } else {
      
    }
    res.status(200).json(JSON.stringify(searchResult));
  } catch (e) {
    console.error(e);
    return res.status(500).send(e);
  }

});

module.exports = router;

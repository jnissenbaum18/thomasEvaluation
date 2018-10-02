var express = require('express');
var router = express.Router();

var db = require('../db/index.js');
//import db from '../db';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({dbStatus: db.readyState});
});

module.exports = router;

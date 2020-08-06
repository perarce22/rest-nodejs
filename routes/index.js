"use strict"        // add
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200)   // add
     .json({'message': 'Hello World'});

  /// Remover:
  /// res.render('index', { title: 'Express' });
});

module.exports = router;

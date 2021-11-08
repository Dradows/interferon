var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tree', function (req, res, next) {
  res.render('tree');
});

router.get('/treeBird', function (req, res, next) {
  res.render('treeBird');
});

router.get('/difference', function (req, res, next) {
  res.render('difference');
});

module.exports = router;

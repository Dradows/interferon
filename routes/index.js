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

router.get('/chromosome', function (req, res, next) {
  res.render('chromosome');
});

router.get('/update', (req, res, next) => {
  let exec = require('child_process').exec;
  exec('git pull');
  res.status(200).send('updated');
});

module.exports = router;

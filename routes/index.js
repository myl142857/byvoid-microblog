var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

router.get('/hello', function(req, res) {
  res.send('The time is ' + new Date().toString());
});

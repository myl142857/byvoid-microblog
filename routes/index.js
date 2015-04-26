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

util = require('util');
router.get('/list', function(req, res){
  res.render('list', {
    title: 'List',
    header: util.inspect(req.headers),
    items: [1991, 'byvoid', 'express', 'Node.js']
  });
});

router.get('/u/:user', function(req, res){
});
router.post('/post', function(req, res){
});
router.get('/reg', function(req, res){
});
router.post('/reg', function(req, res){
});
router.get('/login', function(req, res){
});
router.post('/login', function(req, res){
});
router.get('/logout', function(req, res){
});

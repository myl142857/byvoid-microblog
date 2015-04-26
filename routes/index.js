var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: '首页',
    user: req.session.user,
    success: req.session.success,
    error: req.session.error
  });
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
  res.render('reg', {
    title: '用户注册',
    user: req.session.user,
    success: req.session.success,
    error: req.session.error
  });
});
router.post('/reg', function(req, res){
  if(req.body['password-repeat'] != req.body['password']){
    //req.flash('error', '两次输入的口令不一致');
    req.session.error = ['两次输入的口令不一致'];
    return res.redirect('/reg');
  }
  //生成口令的散列值
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');
  var newUser = new User({
    name: req.body.username,
    password: password,
  });
  //检查用户名是否已经存在
  User.get(newUser.name, function(err, user) {
    if (user)
      err = 'Username already exists.';
    if (err) {
      //req.flash('error', err);
      req.session.error = err;
      return res.redirect('/reg');
    }
    //如果不存在则新增用户
    newUser.save(function(err) {
      if (err) {
        req.flash('error', err);
        return res.redirect('/reg');
      }
      req.session.user = newUser;
      //req.flash('success', '注册成功');
      req.session.success = '注册成功';
      res.redirect('/');
    });
  });
});

router.get('/login', function(req, res){
});
router.post('/login', function(req, res){
});
router.get('/logout', function(req, res){
});

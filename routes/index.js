var express = require('express');
var router = express.Router();
var crypto = require('crypto');
//var User = require('../models/user.js');
var User = require('../models/user-fs.js');
//var Post = require('../models/post.js');
var Post = require('../models/post-fs.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  Post.get(null, function(err, posts){
    if(err){
      posts = [];
    }
    res.render('index', {
      title: '首页',
      posts: posts,
      user: req.session.user,
      success: req.session.success,
      error: req.session.error
    });
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

router.get('/u/:user', function(req, res) {
  User.get(req.params.user, function(err, user) {
    if (!user) {
      //req.flash('error', '用户不存在');
      req.session.error = '用户不存在';
      return res.redirect('/');
    }
    Post.get(user.name, function(err, posts) {
      if (err) {
        req.flash('error', err);
        req.session.error = err;
        return res.redirect('/');
      }
      res.render('user', {
        title: user.name,
        posts: posts,
        user: req.session.user,
        success: req.session.success,
        error: req.session.error
      });
    });
  });
});

router.post('/post', checkLogin);
router.post('/post', function(req, res) {
  var currentUser = req.session.user;
  var post = new Post(currentUser.name, req.body.post);
  post.save(function(err) {
    if (err) {
      //req.flash('error', err);
      req.session.error = err;
      return res.redirect('/');
    }
    //req.flash('success', '发表成功');
    req.session.success = '发表成功';
    res.redirect('/u/' + currentUser.name);
  });
});

router.get('/reg', checkNotLogin);
router.get('/reg', function(req, res){
  res.render('reg', {
    title: '用户注册',
    user: req.session.user,
    success: req.session.success,
    error: req.session.error
  });
});
router.post('/reg', checkNotLogin);
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
        //req.flash('error', err);
        req.session.error = err;
        return res.redirect('/reg');
      }
      req.session.user = newUser;
      //req.flash('success', '注册成功');
      req.session.success = '注册成功';
      res.redirect('/');
    });
  });
});

router.get('/login', checkNotLogin);
router.get('/login', function(req, res){
  res.render('login', {
    title: '用户登入',
    user: req.session.user,
    success: req.session.success,
    error: req.session.error
  });
});
router.post('/login', checkNotLogin);
router.post('/login', function(req, res){
  //生成口令的散列值
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');
  User.get(req.body.username, function(err, user) {
  if (!user) {
  //req.flash('error', '用户不存在');
  req.session.error = '用户不存在';
  return res.redirect('/login');
  }
  if (user.password != password) {
  //req.flash('error', '用户口令错误');
  req.session.error = '用户口令错误';
  return res.redirect('/login');
  }
  req.session.user = user;
  //req.flash('success', '登入成功');
  req.session.success = '登入成功';
  res.redirect('/');
  });
});

router.get('/logout', checkLogin);
router.get('/logout', function(req, res){
  req.session.user = null;
  //req.flash('success', '登出成功');
  req.session.success = '登出成功';
  res.redirect('/');
});

function checkLogin(req, res, next) {
  if (!req.session.user) {
    //req.flash('error', '未登入');
    req.session.error = '未登入';
    return res.redirect('/login');
  }
  next();
}
function checkNotLogin(req, res, next) {
  if (req.session.user) {
    //req.flash('error', '已登入');
    req.session.error = '已登入';
    return res.redirect('/');
  }
  next();
}

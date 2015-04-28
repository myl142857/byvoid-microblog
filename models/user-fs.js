var mongodb = require('./db');
var fs = require('fs');
var path = require('path');
var util = require('util');
var Usersdir = "./users/";
var Postsdir = "./posts/";


function User(user) {
  this.name = user.name;
  this.password = user.password;
};
module.exports = User;

User.prototype.save = function save(callback) {
  // 存入 Mongodb 的文檔
  var user = {
    name: this.name,
    password: this.password,
  };
  
  //console.log(path.normalize(Usersdir + username));
  if(!fs.existsSync(path.normalize(Usersdir))){
    fs.mkdirSync(path.normalize(Usersdir));
    fs.mkdirSync(path.normalize(Postsdir));
  }
  fs.writeFile(path.normalize(Usersdir + user.name), JSON.stringify(user), function(err, user){
    if (err) {
      return callback(err);
    }
    callback(err, user);
  });

/*
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }
    // 讀取 users 集合
    db.collection('users', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      // 爲 name 屬性添加索引
      collection.ensureIndex('name', {unique: true});
      // 寫入 user 文檔
      collection.insert(user, {safe: true}, function(err, user) {
        mongodb.close();
        callback(err, user);
      });
    });
  });
*/
};

User.get = function get(username, callback) {
  //console.error(path.normalize("----" + Usersdir + username));
  fs.readFile(path.normalize( Usersdir +username), {encoding:'utf-8'}, function(err, data){
      if(err) console.error(err);
      if(err) return callback(null, null);
      var doc = JSON.parse(data);
      var user = new User(doc);
      callback(null, user);
  });


/*
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }
    // 讀取 users 集合
    db.collection('users', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      // 查找 name 屬性爲 username 的文檔
      collection.findOne({name: username}, function(err, doc) {
        mongodb.close();
        if (doc) {
console.error(doc.name + doc.password);
          // 封裝文檔爲 User 對象
          var user = new User(doc);
          callback(err, user);
        } else {
          callback(err, null);
        }
      });
    });
  });
*/
};

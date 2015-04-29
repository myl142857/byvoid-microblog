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
};

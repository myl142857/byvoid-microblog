var fs = require('fs');
var path = require('path');
var util = require('util');
var Postsdir = "./posts/";

function Post(username, post, time) {
  this.user = username;
  this.post = post;
  if (time) {
    this.time = time;
  } else {
    this.time = new Date();
  }
};
module.exports = Post;

Post.prototype.save = function save(callback) {
  // 存入 Mongodb 的文檔
  var post = {
    user: this.user,
    post: this.post,
    time: this.time,
  };

  //post will be store in: ./Posts/user/time
console.error("-----" + path.normalize(Postsdir +post.user));
  if(!fs.existsSync(path.normalize(Postsdir +post.user))){ 
    fs.mkdirSync(path.normalize(Postsdir +post.user));
  }

  fs.writeFile(path.normalize(Postsdir + post.user + '/' + post.time ), JSON.stringify(post), function(err, post){
    if (err) {
      return callback(err);
    }
    callback(err, post);
  });
};

function scanFolder(path){
    var fileList = [],
        walk = function(path, fileList){
            files = fs.readdirSync(path);
            files.forEach(function(item) {
                var tmpPath = path + '/' + item,
                    stats = fs.statSync(tmpPath);

                if (stats.isDirectory()) {
                    walk(tmpPath, fileList);
                } else {
                    fileList.push(tmpPath);
                }
            });
        };

    walk(path, fileList);

//    console.log('扫描' + path +'成功');
//    console.log('\nfiles: ' + fileList );

    return fileList;
}

Post.get = function get(username, callback) {
  if(username === null){
    var files = scanFolder("./posts");
      if(files.length===0) return callback(null, []);
      // 封裝 posts 爲 Post 對象
      var posts = [];
      var doc;
      files.forEach(function(file){
	console.error("===="+ file);
        fs.readFile(file, 'utf8', function(err, data){
          doc = JSON.parse(data);
          var post = new Post(doc.user, doc.post, doc.time);
          posts.push(post);
          if(posts.length === files.length) callback(null, posts);
        });
      });
  }else{
    fs.readdir(path.normalize(Postsdir + username), function (err, files) {
      if (err) return callback(err);
 
      // 封裝 posts 爲 Post 對象
      var posts = [];
      var doc;
      files.forEach(function(file){
	fs.readFile(path.normalize(Postsdir + username + '/' + file), 'utf8', function(err, data){
          doc = JSON.parse(data);
          var post = new Post(doc.user, doc.post, doc.time);
          posts.push(post);
          if(posts.length === files.length) callback(null, posts);
        });
      });
    });
  }
};

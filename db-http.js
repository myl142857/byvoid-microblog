// http://localhost:8888/?name=%27abc%27&pwd=%27p123wd%27
var http = require("http"),
    mongo = require("mongodb"),
    url = require("url"),
    querystring = require("querystring");
    
http.createServer(function (req, res) {
var db = new mongo.Db("mongotest", new mongo.Server('127.0.0.1', 27017, {auto_reconnect:true}), {safe: true});
    db.open(function () {
        db.collection("user", function (err, collection) {

/*
            // 获取GET请求从参数 加入user表
            collection.insert({'name':querystring.parse(url.parse(req.url).query)['name'],'pwd':querystring.parse(url.parse(req.url).query)['pwd']},function(err,result){
            res.writeHead(200);
            res.end(JSON.stringify(result));
            });
*/

            /* 批量插入
            var temp1 = { name: "11", pwd: "11" };
            var temp2 = { name: "22", pwd: "22" };
            collection.insert([temp1, temp2], { safe: true }, function (err,result) {}); */


            //按条件查询
            //collection.find({ 'name': querystring.parse(url.parse(req.url).query)['name'] }).toArray(function (err, items) {});
            
            //获取所有数据
            collection.find().toArray(function (err, items) {
                if (items.length > 0) {
                    res.writeHead(200);
                    res.end(JSON.stringify(items));
                } else {
                    res.writeHead(200);
                    var obj = { value: "error" };
                    res.end(JSON.stringify(obj));
                }
            });
        });
    });
}).listen(8888);

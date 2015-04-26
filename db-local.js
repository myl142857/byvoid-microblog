/*
# mongo
> use mongotest;
switched to db mongotest
> db.user.insert({
name:'flyoung',
age:'18',
sex:true
});
 
> db.user.find()
{ "_id" : ObjectId("553c24b2c9f211753e7a65f4"), "name" : "flyoung", "age" : "18", "sex" : true }
*/

var mongodb = require('mongodb');
//var util = require('util');

var server = new mongodb.Server("127.0.0.1",27017,{});//本地27017端口

connect = new mongodb.Db('mongotest',server,{});
connect.open(function(err, db){

  db.collection('user', function(err, collection){
    collection.find(function(err,cursor){
      cursor.each(function(err, doc){
        if(doc){
          console.log("name:"+doc.name+" age:"+doc.age);
        }
      });
    });
  });
});

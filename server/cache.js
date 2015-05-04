var redis = require("redis");
var client = redis.createClient();

client.on("connect", function(){
  console.log("Connected to REDIS");
  client.flushdb();
});

client.on("error", function (err) {
  console.log("Error " + err);
});


module.exports = {
  set: function(key, val){
    return client.set(key, val);
  },
  get: function(key, callback){
    return client.get(key, function(err, reply){
      callback(reply);
    });
  },
  contains: function(key, callback){
    return client.exists(key, function(err, reply){
      callback(reply);
    });
  }
};
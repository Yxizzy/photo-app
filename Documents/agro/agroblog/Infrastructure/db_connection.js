const MongoClient = require('mongodb').MongoClient, Server = require('mongodb').Server;
const assert = require('assert');

//heroku step 2
// Connection URL
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
// Database Name
const host = 'localhost';
const port = 27017;

var globalDbConnection = function(url){ 
    return function(database, callback){
        // var mongocl = new MongoClient(new Server(host, port));
        // mongocl.connect(function(err, mongoClient) {
            MongoClient.connect(url, (err, mongoClient)=>{
            assert.equal(null, err);

            const dbClient = mongoClient.db(database);
            var dbWork = new Promise(
                function(resolve, reject){
                    callback(dbClient, resolve, reject);
                }
            );
            dbWork.then(function(){
                mongoClient.close();                
            }).catch((err)=>{
                console.error(err);
                mongoClient.close();
            });
        });
    }
}(url);
// var globalDbConnection = function(host, port){ 
//     return function(database, callback){
//         var mongocl = new MongoClient(new Server(host, port));
//         mongocl.connect(function(err, mongoClient) {
//             const dbClient = mongoClient.db(database);
//             var dbWork = new Promise(
//                 function(resolve, reject){
//                     callback(dbClient, resolve, reject);
//                 }
//             );
//             dbWork.then(function(){
//                 mongoClient.close();                
//             }).catch((err)=>{
//                 console.error(err);
//                 mongoClient.close();
//             });
//         });
//     }
// }(host, port);

var agroblog = function(database){
    return function(callback){
        globalDbConnection(database, callback);
    }
}("agroblog");

var autoIncrement = function(collectionClient, callback){
    return new Promise (resolve => {
        collectionClient.find().sort({_id: -1}).limit(1).toArray((err, result)=>{
            if(err) {
                reject("Unable to get auto increment");
                resolve(null);
            }
            else{
                if(result.length != 0 ) {
                    if (callback) callback(parseInt(result[0]._id) + 1);
                    resolve(parseInt(result[0]._id) + 1);
                }
                else {
                    console.log("array is empty")
                    if(callback) callback(1);     //converted back to int
                    resolve(1);
                }
            }
        });
    });
}



module.exports = {
    globalDbConnection, agroblog, autoIncrement
}
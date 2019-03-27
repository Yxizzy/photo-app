var structure = require("../../../../Infrastructure/structure");

class Tokens {
    static generate(length){
        var letters = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
        var result = "";
        for (let i = 0; i < length; i++) {
            result+= letters.charAt(Math.floor(Math.random() * (letters.length -1)));
        }
        return result;
    }
    static saveToken(token, user_id, callback){
        var object = {
            token, user_id, lastTime: new Date().toLocaleString()
        };
        return new Promise( pResolve => {
            structure.db.agroblog((client, resolve, reject)=>{
                client.collection(this.name).insertOne(
                    object,
                    (err, result)=>{
                        if(err){
                            reject(err);
                            if(callback) callback(err);
                            pResolve({err});
                        }else{
                            resolve();
                            if(callback) callback(err, result.insertedId);
                            pResolve({error: err, result: result.insertedId});
                        }
                    }
                )
            })
        });
    }
    static tokenExists(token, callback){
        structure.db.agroblog((client, resolve, reject)=>{
            client.collection(this.name).findOne(
                {token},
                {projection: {user_id: 1}},
                (err, result)=>{
                    if(err){
                        reject(err);
                        callback(err);
                    }else{
                        resolve();
                        if(result && result.user_id){
                            callback(err, true);
                        }else{
                            callback(err, false);
                        }
                    }
                }
            )
        })
    }
    static getByUserId(user_id){
        return new Promise(callback=>{
            structure.db.agroblog((client, resolve, reject)=>{
                client.collection(this.name).findOne(
                    {user_id},
                    {projection: {token: 1, _id: 0}},
                    (error, result)=>{
                        if(error){
                            reject(error);
                            callback({error});
                        }else{
                            resolve();
                            if(result && result.token){
                                callback({error, result: result.token});
                            }else{
                                callback({error, result: false});
                            }
                        }
                    }
                )
            })
        });
    }
    static updateLastCheck(token){

    }
}
Tokens.name = "tokens";
module.exports = Tokens;
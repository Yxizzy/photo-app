var structure = require("../../../../Infrastructure/structure");
var Token = require('./m_tokens');

class Users {
    static async addNew(data, callback){
        var self = this;
        var userNameTest = await self.usernameExists(data.username);
        if(userNameTest.result){
            callback(null, {signup: false, message: "username already exists"});
            return;
        }
        structure.db.agroblog((client, resolve, reject)=>{
            client.collection(self.name).insertOne(
                data,
                async (err, result)=>{
                    if(err){
                        callback(err);
                        reject(err);
                    }else{
                        resolve();
                        data.signup = true;
                        data.token = await self.getDefinedToken();
                        data.message = 'token unique';
                        Token.saveToken(data.token, data._id, async(err, tokenId)=>{
                            if(err){
                                data.message = 'token not saved';
                            }else {
                                data.message = 'token saved';
                            }
                            callback(err, data);
                        })
                    }
                }
            )
        })
    }
    static getDefinedToken(){
        return new Promise(resolve=>{
            let token = Token.generate(60);
            Token.tokenExists(token, async (err, exists)=>{
                if(err){
                    response.token = null;
                    response.message = 'Unable to verify token';
                }else{
                    while(exists){
                        exists = await new Promise(r =>{
                            token = Token.generate(60);
                            Token.tokenExists(token, (err, e)=>{
                                r(e);
                            })
                        });
                    }
                    resolve(token);
                }
            });
        });
    }
    static getPasswordById(username, callback){
        return new Promise(pResolve =>{
            structure.db.agroblog((client, resolve, reject)=>{
                client.collection(this.name).findOne(
                    {username},
                    {pojection: {username: 0, password: 1}},
                    (error, result)=>{ 
                        if(error){
                            reject(error);
                            if(callback) callback(error);
                            pResolve({error});
                        }else{
                            resolve();
                            if(result && result.password){
                                if(callback) callback(error, result.password);
                                pResolve({error, result: result.password});
                            }else{
                                if(callback) callback(error, false);
                                pResolve({error, result: false});
                            }
                        }
                    }
                )
            })
        })
    }
    static usernameExists(username, callback){
        return new Promise(pResolve => {
            structure.db.agroblog((client, resolve, reject)=>{
                client.collection(this.name).findOne(
                    {username},
                    {projection: {_id: 1}},
                    (error, result)=>{
                        if(error){
                            reject(err);
                            if(callback) callback(error);
                            pResolve({error})
                        }else{
                            resolve();
                            if(!result || !result._id){
                                if(callback) callback(error, false);
                                pResolve({error, result: false});
                            }else {
                                if(callback) callback(error, result._id);
                                pResolve({error, result: result._id});
                            }
                        }
                    }
                )
            })
        });
    }
    
}
module.exports = Users;
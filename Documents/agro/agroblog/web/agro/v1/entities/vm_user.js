var m_users = require("../db_models/m_users");
const m_tokens = require("../db_models/m_tokens");
const structure = require("../../../../Infrastructure/structure");
module.exports = class VMUser{
    async login(data, callback){
        var self = this;
        data.username = data.username.toLowerCase();
        const user = await m_users.usernameExists(data.username);
        if(user.result){
            const {result} = await m_users.getPasswordById(data.username);
            structure.passwordEncrypt.comparePassword(
                data.password, result,
                async (err, isMatch)=>{
                    let response = {};
                    if(err){ 
                        response.login = false;
                        response.message = "Error!";
                        callback(response);
                    }
                    else{
                        if(isMatch){
                            response.login = true;
                            response.message = "success";
                            response.userId = user.result;
                            let tokenResult = await m_tokens.getByUserId(user.result);
                            if(tokenResult.result){
                                response.token = tokenResult.result;
                            }else{
                                response.token = await m_users.getDefinedToken();
                                let saveToken = await m_tokens.saveToken(
                                    response.token, response.userId
                                );
                                if(saveToken.result){
                                    response.message = "token saved";
                                }else response.message = 'token not saved';
                            }
                            callback(response);
                        }else {
                            response.login = false;
                            response.userId = user.result;
                            response.message = 'password mismatch!';
                            callback(response);
                        }
                    }
                }
            )
        }else{
            callback({login: false, message: "username does not exist"});
        }
    }
    async signup(data, callback){
        data.username = data.username.toLowerCase();
        data.email = data.email.toLowerCase();
        structure.passwordEncrypt.hashPassword(data.password, (err, hash) => {
            data.password = hash;
            structure.db.agroblog((client, resolve, reject)=>{
                structure.db.autoIncrement(client.collection(m_users.name), id=>{
                    resolve();
                    data._id = id;
                    m_users.addNew(data, (err, result)=>{
                        callback(result);
                    });
                })
            })
        });
    }
}
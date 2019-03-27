let user = require('../entities/en_user');

module.exports = function(req, res){
    switch(req.params.action){
        case "login" : user.login(req, res); break;
        case "signup" : user.signup(req, res);
    }
}
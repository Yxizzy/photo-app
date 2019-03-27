var vm_user = require('./vm_user');

class user{
    static login(req, res){
        this.vm_user.login(req.body, result=>res.send(result));
    }
    static signup(req, res){
        this.vm_user.signup(req.body, result => res.send(result));
    }
}
user.vm_user = new vm_user();

module.exports = user;
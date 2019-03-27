let userActions = require('./actions/userActions');
const blogActions = require("./actions/blogActions");
module.exports = function(req, res){
    console.log("Owner is = " + req.params.owner);
    switch(req.params.owner){
        case "user" : userActions(req, res); break;
        case "blog" : blogActions(req, res); break;
    }
}
let agroHandler = require("./agro/handler");

module.exports = function(req, res){
    console.log("app name = " + req.params.appname);
    switch (req.params.appname) {
        case "agroblog": agroHandler(req, res);
            break;
    }
}
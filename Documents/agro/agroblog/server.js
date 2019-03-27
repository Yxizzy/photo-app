var express = require('express');
var bodyParser = require('body-parser');
var webHandler = require('./web/webHandler');
var cors = require("cors");
const path = require("path");

var app = express();
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//heroku step one
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use('/web/agroblog/image', express.static('./web/agro/files/media/images'));
//server presentation "localhost:8080/web/agroblog/v1/:owner/:action"
app.get('/web/:appname/:version/:owner/:action', jsonParser, function(req, res){
    webHandler(req, res);
});

app.post('/web/:appname/:version/:owner/:action', jsonParser, function(req, res){
    console.log(req.body);
    console.log(req.params);

    webHandler(req, res);
});

app.post('/web/:appname/:version/enc/:owner/:action', urlencodedParser, function(req, res){
    console.log(req.body);
    console.log(req.params);

    webHandler(req, res);
});

//heroku step 3 ===> step in package.json
if(process.env.NODE_ENV === 'production'){
    //import into server
    app.use(express.static('client/dist'));
    //send it for default route

    app.get('*', (req, res)=>{
        res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html')); //relative path
    })

}else{
    app.get("/", (req, res)=>{
        res.send("Welcome to our website");
    });
}
app.listen(PORT, ()=>{
    console.log("Server running on port " + PORT);
})
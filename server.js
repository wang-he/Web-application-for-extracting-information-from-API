var express = require('express'),
    app = express();
    port = 8080,
    cors = require("cors"),
    request  = require('request'),
    bodyParser = require("body-parser");


app.use(express.urlencoded({extended: true})); 
app.use(express.json());
app.use(express.static("public"));
app.use(express.static(__dirname + "/views"));
app.use(cors());

app.get("/home", function(req, res){
    res.sendFile("index.html");
})

app.post("/get-user", function(req, res){    
    console.log(req.body);
    var options = { 
        url: 'http://localhost:8098/api/person/get/' + req.body.pin  + '?access_token=',
    };
    
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.send(data);
        }
        console.log(error);
    }
    request(options, callback);
})

app.post("/del-user", function(req, res){    
    var options = { 
        url: 'http://localhost:8098/api/person/delete/' + req.body.pin  + '?access_token=',
        method: 'POST'
    };
    
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.send(data);
        }
        console.log(error);
    }
    request(options, callback);
})

app.post("/add-user", function(req, res){    
    var pretty = JSON.stringify(obj, undefined, 4);
    var options = { 
        url: 'http://localhost:8098/api/person/add?access_token=',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: pretty
    };
    
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.send(data);
        }
        console.log(error);
    }
    request(options, callback);
})

app.listen(port, function(){
    console.log("App is running on port " + port);
})


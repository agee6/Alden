var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(__dirname + "/"));

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/mainPage.html'));
});

app.get('/practice', function(req, res) {
    res.sendFile(path.join(__dirname + '/Practice/index.html'));
})

app.get('/fieldgoal', function(req, res) {
    res.sendFile(path.join(__dirname + '/FieldGoal/fieldGoal.html'));
})

var server = app.listen(8080);
console.log('Express server started on port %s', server.address().port);
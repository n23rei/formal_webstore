var express = require('express');
var app = express();
var path = require("path");
var port = process.env.PORT || 80

app.use('/images', express.static('build/images'));
app.use('/static', express.static('build/static'));


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});


app.listen(port,() => {
    console.log('listen', port)
})
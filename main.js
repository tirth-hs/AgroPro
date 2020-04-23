var express = require('express');
var path = require('path');
var request = require('request');

var app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname));

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/examples/rainfall.html'));
})
app.get('/rainfall.html',function(req,res){
    res.sendFile(path.join(__dirname+'/examples/rainfall.html'));
})
app.get('/crop.html',function(req,res){
    res.sendFile(path.join(__dirname+'/examples/crop.html'));
})
app.get('/news.html',function(req,res){
    request('http://newsapi.org/v2/everything?q=rainfall in india&apiKey=3b7021b74bfe474dac3f7a4786491e9b', function (error, response, body) {
    var data = response.body
    var json = JSON.parse(data);
    console.log(json.articles)
    res.render('test',{data : json.articles})
});
})
app.get('/agriculture',function(req,res){
    request('http://newsapi.org/v2/everything?q=agriculture in india&apiKey=3b7021b74bfe474dac3f7a4786491e9b', function (error, response, body) {
    var data = response.body
    var json = JSON.parse(data);
    console.log(json.articles)
    res.render('test',{data : json.articles})
});
})
app.get('/schemes.html',function(req,res){
    res.sendFile(path.join(__dirname+'/examples/schemes.html'));
})
app.listen(8080,()=>{
    console.log('Server listening at port 8080')
});

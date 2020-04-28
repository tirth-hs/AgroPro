var express = require('express');
var path = require('path');

var request = require('request');

var app = express();
var http = require("http").createServer(app);

app.set('view engine', 'ejs');

app.use(express.static(__dirname));

'use strict';
const fs = require('fs');
let rawdata = fs.readFileSync('crop.json');
let crop = JSON.parse(rawdata);
crop = crop.crop;

http.listen(process.env.PORT || 3000, function(){
    app.get('/',function(req,res){
        res.sendFile(path.join(__dirname+'/examples/rainfall.html'));
    })
    app.get('/rainfall.html',function(req,res){
        res.sendFile(path.join(__dirname+'/examples/rainfall.html'));
    })
    app.get('/crop.html',function(req,res){
        let crop_final = []
        let rain = 942.31
        for(i =0;i<crop.length;i++) {
            if(crop[i].min_rain<=rain&&rain<=crop[i].max_rain) {
                crop_final.push(crop[i])
            }
        }
        var data = crop_final
        var count = 0
        res.render('crop',{data:data,count:count});
    })
    app.get('/news.html',function(req,res){
        request('http://newsapi.org/v2/everything?qInTitle=rain&sources=the-hindu,the-times-of-india,google-news-in&sortBy=publishedAt&apiKey=3b7021b74bfe474dac3f7a4786491e9b', function (error, response, body) {
        var data = response.body
        var json = JSON.parse(data);
        var x,a,b,c,d
        res.render('news',{data: json.articles.slice(10),x:"Rainfall",a:"success",b:"light",c:"light",d:"light" })
    });
    })
    app.get('/agriculture',function(req,res){
        request('http://newsapi.org/v2/everything?qInTitle=agriculture OR crops&sources=the-hindu,the-times-of-india,google-news-in&sortBy=publishedAt&apiKey=3b7021b74bfe474dac3f7a4786491e9b', function (error, response, body) {
        var data = response.body
        var json = JSON.parse(data);
        var x,a,b,c,d
        res.render('news',{data : json.articles.slice(10),x:"Agriculture",a:"light",b:"success",c:"light",d:"light"})
    });
    })
    app.get('/farmers',function(req,res){
        request('http://newsapi.org/v2/everything?qInTitle=farmer OR kisan OR farmers  &sources=the-hindu,the-times-of-india,google-news-in&sortBy=publishedAt&apiKey=3b7021b74bfe474dac3f7a4786491e9b', function (error, response, body) {
        var data = response.body
        var json = JSON.parse(data);
        var x,a,b,c,d
        res.render('news',{data : json.articles.slice(10),x:"Farmers",a:"light",b:"light",c:"success",d:"light"})
    });
    })
    app.get('/irrigation',function(req,res){
        request('http://newsapi.org/v2/everything?q=irrigation&sources=the-hindu,the-times-of-india,google-news-in&sortBy=publishedAt&apiKey=3b7021b74bfe474dac3f7a4786491e9b', function (error, response, body) {
        var data = response.body
        var json = JSON.parse(data);
        var x,a,b,c,d,e
        res.render('news',{data : json.articles.slice(10),x:"Irrigation",a:"light",b:"light",c:"light",d:"success"})
    });
    })
    app.get('/schemes.html',function(req,res){
        res.sendFile(path.join(__dirname+'/examples/schemes.html'));
    })
})






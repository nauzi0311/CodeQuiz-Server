'use strict'
var express = require('express');
const { json, type } = require('express/lib/response');
require('date-utils');
var router = express.Router();
const fs = require('fs');

exports.WriteNewJSONFile = function (file,data) {
    fs.writeFileSync(file,JSON.stringify(data,null,'    '));
}

exports.WriteNewTXTFile = function (file,data) {
    fs.writeFileSync(file,data,(err) => {if (err) throw err;});
}

exports.WriteAddFile = function (file,data) {
    fs.appendFile(file,data,(err) => {if (err) throw err;});
}

exports.ReadJSONFile = function (file){
    return JSON.parse(fs.readFileSync(file,'utf8'));
}

exports.GenerateTimestamp = function(){
    const timestamp = new Date().toFormat('YYYY年MM月DD日 HH24時MI分SS秒');
    return "[" + timestamp + "]";
}

exports.GetSchoolNum = function(device){
    const user_file = './data/user/' + device + '.json';
    var user_data = JSON.parse(fs.readFileSync(user_file,'utf8'));
    return user_data.school_num;
}

exports.GetUserData = function(device){
    const file = './data/user/' + device + '.json';
    return JSON.parse(fs.readFileSync(file,'utf8'));
}
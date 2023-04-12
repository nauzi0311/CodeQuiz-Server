'use strict'
var express = require('express');
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

exports.GetCourseDir = function(course){
    return './data/' + course + '/';
}

exports.GetSchoolNum = function(device,course){
    const user_file = GetCourseDir(course) + 'user/' + device + '.json';
    var user_data = ReadJSONFile(user_file);
    return user_data.school_num;
}

exports.GetUserData = function(device,course){
    const file = GetCourseDir(course) + 'user/' + device + '.json';
    return ReadJSONFile(file);
}

exports.GetUserName = function(device,course){
    const file = GetCourseDir(course) + 'user.json'
    var data =  JSON.parse(fs.readFileSync(file,'utf8'));
    for(i = 0;i < data.length;i++){
        if(data[i].device == device){
            return data[i].username;
        }
    }
}

function GetCourseDir(course){
    return './data/' + course + '/';
}

function ReadJSONFile(file){
    return JSON.parse(fs.readFileSync(file,'utf8'));
}
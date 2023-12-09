'use strict'
var express = require('express');
require('date-utils');
var router = express.Router();
const fs = require('fs');
const { ReadJSONFile, GenerateTimestamp, WriteAddFile, WriteNewTXTFile, WriteNewJSONFile, GetSchoolNum,GetUserData, GetCourseDir } = require('../library');
const course = 'soft2';
const config_file = GetCourseDir(course) + 'config.json';
const log_file = './log/soft2/log.txt';

/* POST home page. */
router.post('/', function(req, res, next) {
  console.log(req.body);
  const device = req.body.device;
  const user_file = GetCourseDir(course) + 'user/' + device + '.json';

  if(fs.existsSync(user_file)){
    //exist user
    //read file
    const config_data = ReadJSONFile(config_file);
    console.log(config_data);
    var user_data = GetUserData(device,course);
    console.log(user_data);
    user_data.config = config_data;
    //write log
    const log_data = GenerateTimestamp() +" access index " + "{" +user_data.school_num + "}" + "\n";
    WriteAddFile(log_file,log_data);
    WriteAddFile("./log/soft2/" + GetSchoolNum(device,course) + ".txt",log_data);

    //response
    res.json(user_data);
    console.log("index complete");
    
  }else{
    //no exist
    //write log
    const log_data = GenerateTimestamp() + " access index!nofile " + "{" + device + "}" + "\n";
    WriteAddFile(log_file,log_data);

    //response
    res.send("new");
    console.log("new user complete");
  }
  /*
  data format
  {
    device : "id"
  }
  */
});

router.post('/signup', function(req, res, next) {
  console.log(req.body);
  const [device,username,id,school_num] = UserData(req.body);
  const config_data = ReadJSONFile(config_file);
  const response = config_data;

  //create New User
  AddUserData(req.body);
  //write log
  const log_data = GenerateTimestamp() + " signup process | " + school_num + " signup as "+ username + " using id:" + id + "\n";
  WriteAddFile(log_file,log_data);
  //write user_log
  const new_log_file = "./log/soft2/" + school_num + ".txt";
  WriteNewTXTFile(new_log_file,log_data);
  console.log('sign up complete');
  res.json(response);
});

router.post('/version', function(req, res, next) {
  console.log(req.body);
  const user_version = req.body.version;
  console.log(user_version);
  const version = "1-0-5";
  const url = "https://se.is.kit.ac.jp/beakfish/apk/CodeQuiz-" + version + ".apk" ;
  const response = {"version":version,"url":url,visible:true};

  //write log
  const log_data = GenerateTimestamp() + " version process | " + user_version + " latest "+ version + "\n";
  WriteAddFile(log_file,log_data);

  console.log('version complete');
  res.json(response);
});

function UserData(body){
  return [body.device,body.username,body.id,body.school_num];
}

function AddUserData(body){
  WriteUserFile(body);
  WriteNewUserFile(body);
  WriteRankingFile(body);
}

function WriteUserFile(body){
  const user_file = GetCourseDir(course) + 'user.json';
  const [device,username,id,school_num] = UserData(body);  
  const add_date = {"device":device,"password":id,"username":username,"school_num":school_num};
  var user_data = ReadJSONFile(user_file);
  user_data.push(add_date);
  WriteNewJSONFile(user_file,user_data);
}

function WriteNewUserFile(body){
  const device = body.device;
  const school_num = body.school_num;
  const new_user_file = GetCourseDir(course) + 'user/' + device + '.json';
  const new_user_data = {"school_num":school_num,"level":1,"exp":0,"point":0,"correct_id":[],correct_count:0,"badge": [],"date":[],"equipment":0};
  WriteNewJSONFile(new_user_file,new_user_data);
}

function WriteRankingFile(body){
  const ranking_file = GetCourseDir(course) + 'ranking.json';
  console.log(body.device);
  var ranking_data = ReadJSONFile(ranking_file);
  const add_data = {"device":body.device,"username":body.username,"level":1,"exp":0,"equipment":0};
  ranking_data.push(add_data);
  WriteNewJSONFile(ranking_file,ranking_data);
}

module.exports = router;

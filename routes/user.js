const { count } = require('console');
var express = require('express');
const { json } = require('express/lib/response');
var router = express.Router();
const fs = require('fs');

/* POST user listing. */
router.post('/', function(req, res, next) {
  var device = req.body.device;
  var level = req.body.level;
  var point = req.body.point;
  var correct = req.body.correct;
  var jfile = './data/user/' + device +'.json';
  var corrected = JSON.parse(fs.readFileSync(jfile,'utf-8')).correct_id;
  var diary = JSON.parse(fs.readFileSync(jfile,'utf-8')).date;
  var badge = JSON.parse(fs.readFileSync(jfile,'utf-8')).badge;
  var date = req.body.date;
  var response = '';
  var countb = 0;
  var countm = 0;
  var counth = 0;
  
  if(corrected == null){
    corrected = correct;
  }else{
    corrected = corrected.concat(correct);
  }
  corrected = Array.from(new Set(corrected));
  corrected.sort(function(a,b){return (a < b ? -1 : 1);});
  if(diary == null){
    diary = [date];
  }else{
    diary = diary.concat(date);
  }
  diary = Array.from(new Set(diary));
  console.log(corrected);
  for(i = 0;i < corrected.length;i++){
    switch (parseInt(corrected[i]/1000)){
      case 1:
        countb++;
        break;
      case 2:
        countm++;
        break;
      case 3:
        counth++;
        break;
      //add here
      default:
    }
  }
  //C beginner
  if(corrected[6] == 1007){
    if(badge[1] == false){
      badge[1] = true;
      response = response + 'Badge1';
    }
  }
  if(countb >= 10){
    if(badge[2] == false){
      badge[2] = true;
      response = response + 'Badge2';
    }
  }
  if(countb >= 30){
    if(badge[3] == false){
      badge[3] = true;
      response = response + 'Badge3';
    }
  }
  if(countb >= 32){
    if(badge[4] == false){
      badge[4] = true;
      response = response + 'Badge4';
    }
  }
  //C Intermidiate
  if(countm >= 10){
    if(badge[5] == false){
      badge[5] = true;
      response = response + 'Badge5';
    }
  }
  // C expert
  if(counth >= 10){
    if(badge[8] == false){
      badge[8] = true;
      response = response + 'Badge8';
    }
  }
  if(counth >= 20){
    if(badge[9] == false){
      badge[9] = true;
      response = response + 'Badge9';
    }
  }
  if(response == ''){
    response = 'Update';
  }
  console.log(response);
  res.send(response);
  var data = {"level":level,"point":point,"correct_id":corrected,"badge":badge,"date":diary};
  fs.writeFileSync(jfile,JSON.stringify(data,null,'    '));
  console.log(response);
  const dateu = new Date();
  const currentTime = dateu.toFormat('YYYYMMDDHH24MISS');
  var fdata = currentTime + " module " + "{user} "+ device + " " + level + "\n";
  fs.appendFile("log.txt",fdata,(err) => {if (err) throw err;
  console.log("user complete");})
});

module.exports = router;

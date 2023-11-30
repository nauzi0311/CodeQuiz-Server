var express = require('express');
var router = express.Router();
require('date-utils');

const child_process = require("child_process");
const { WriteAddFile, GenerateTimestamp, GetSchoolNum, ReadJSONFile, WriteNewJSONFile, GetCourseDir } = require('../library');
const { GetCourseText } = require('./constValue');
const course = GetCourseText();

/* POST users listing. */
/* to get question
  process json like{"device": "uuid","course" : "soft1", "times" : 1}
  when get the json like above, send each json file.
*/
router.post('/', function (req, res, next) {
  console.log(req.body);
  //const [device, area] = RankingData(req.body);
  const device = req.body.device;
  const ranking_file = GetCourseDir(course) + 'ranking.json';
  const log_file = './log/'+ GetCourseText() + '/log.txt';
  var rank = 0;
  var ranking_data = ReadJSONFile(ranking_file);
  for(i = 0; i < ranking_data.length; i++) {
    if(ranking_data[i].device == device){
      rank = i + 1;
    }
  }
  var response = {"ranking" : ranking_data,"count":rank};
  var log_data = GenerateTimestamp() + " access ranking " + GetSchoolNum(device,course) + "\n";
  console.log(log_data);
  WriteAddFile(log_file, log_data);
  WriteAddFile("./log/"+ GetCourseText() + "/" + GetSchoolNum(device,course) + ".txt", log_data);
  console.log("ranking complete");
  res.json(response);
});

router.post('/equip/', function (req, res, next) {
  console.log(req.body);
  const device = req.body.device;
  const ranking_file = GetCourseDir(course) + 'ranking.json';
  const user_file = GetCourseDir(course) + 'user/' +device + '.json';
  const log_file = './log/'+ GetCourseText() + '/log.txt';
  //ranking_data change
  console.log("check");
  var ranking_data = ReadJSONFile(ranking_file);
  for(i = 0; i < ranking_data.length; i++) {
    if(ranking_data[i].device == device){
      ranking_data[i].equipment = req.body.equipment;
    }
  }
  WriteNewJSONFile(ranking_file,ranking_data);
  //user_data change
  var user_data = ReadJSONFile(user_file);
  user_data.equipment = req.body.equipment;
  WriteNewJSONFile(user_file, user_data);
  //write log
  var log_data = GenerateTimestamp() + " access equipment " + GetSchoolNum(device,course) + "\n";
  console.log(log_data);
  WriteAddFile(log_file, log_data);
  WriteAddFile("./log/"+ GetCourseText() + "/" + GetSchoolNum(device,course) + ".txt", log_data);
  console.log("equip complete");
  res.json("ok");
});


module.exports = router;
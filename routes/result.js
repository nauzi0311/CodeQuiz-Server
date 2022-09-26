var express = require('express');
var router = express.Router();
require('date-utils');

const fs = require('fs');
const child_process = require("child_process");
const { WriteAddFile, GenerateTimestamp, GetSchoolNum,ReadJSONFile,GetUserData, WriteNewJSONFile } = require('./library');

/* POST users listing. */
/* to get question
  process json like{"device": "uuid","course" : "soft1", "times" : 1}
  when get the json like above, send each json file.
*/
router.post('/', function(req, res, next) {
  console.log(req.body);
  const [device,level,point,id,correct,second_list,user_answer] = QuestData(req.body);
  
  var user_data = GetUserData(device);
  //change level
  user_data.level = level;

  //change point
  user_data.point = point;

  //add Date
  user_data.date.push(new Date().toFormat('YYYY-MM-DD'));
  
  //process correct questions
  {
    for(i = 0;i < correct.length;i++) {
      if(correct[i]){
        user_data.correct_id.push(id[i]);
        user_data.correct_count++;
      }
    }
    user_data.correct_id  = Array.from(new Set(user_data.correct_id));
    //降順にソート
    user_data.correct_id.sort(function(first,second){
      if (first > second){
        return 1;
      }else if (first < second){
        return -1;
      }else{
        return 0;
      }
    });
  }
  
  //badge process
  //need

  WriteNewJSONFile('./data/user/' + device + '.json',user_data);

  var log_data = GenerateTimestamp() + " update result " + GetSchoolNum(device) + " level:" + level + " point:" + point  + "\n";
  WriteAddFile("./log/log.txt",log_data);
  console.log(GetCourseNameFromId(id) + "id:" + id);
  log_data = GenerateTimestamp() + " update result \n" + 
  GetCourseNameFromId(id) + "\n" + 
  "id: " + id + "\n" +
  "second_list: " + second_list + "\n" +
  "user_answer: " + user_answer + "\n" +
  "correct: " + correct + "\n" +
  "level: " + user_data.level + "\n" +
  "point: " + user_data.point  + "\n" +
  "correct_id: " + user_data.correct_id  + "\n" +
  "correct_count: " + user_data.correct_count  + "\n" +
  "badge: " + user_data.badge  + "\n" +
  "date: " + user_data.date[user_data.date.length - 1]  + "\n";
  WriteAddFile("./log/" + GetSchoolNum(device) + ".txt",log_data);
  console.log("result complete");
  res.send("result complete");
});


function QuestData(body){
  return [body.device,body.level,body.point,body.id,body.correct,body.second_list,body.user_answer];
}

function GetCourseNameFromId(ids){
  var course,times;
  switch(parseInt(ids[0] / 1000)){
    case 1:
      course = "ソフトウェア演習Ⅰ";
      break;
    default:
      course = "Undefined Course";
      try{
        throw new Error("Error:" + course + times);
      }catch(e){
        console.log(e.message);
      }
      break;
  }
  times = parseInt(ids[0] / 100) % 10;
  return course + " " + "第" + times + "回";
}

module.exports = router;
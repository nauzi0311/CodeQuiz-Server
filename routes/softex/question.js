var express = require('express');
var router = express.Router();

const fs = require('fs');
const child_process = require("child_process");
const { WriteAddFile, GenerateTimestamp, GetSchoolNum, ReadJSONFile, GetCourseDir } = require('../library');
const { GetCourseText } = require('./constValue');
const { log } = require('console');
const log_file = "./log/"+ GetCourseText() +"/log.txt";

/* POST users listing. */
/* to get question
  process json like{"device": uuid,"course" : "soft2", "times" : 1}
  when get the json like above, send each json file.
*/
router.post('/', function (req, res, next) {
  console.log(req.body);
  const [device, course, times] = QuestData(req.body);
  var response = [];
  var res_quest_id = [];

  response = GetQuestionAndReview(course, times);
  log(response)
  for (i = 0; i < response.length; i++) {
    res_quest_id[i] = response[i].id;
  }

  var log_data = GenerateTimestamp() + " request question " + "\"" + GetCourseNameForLog(course) + " " + GetCourseTimeForLog(times) + "\" " + res_quest_id + "\n";
  WriteAddFile(log_file, log_data);
  WriteAddFile("./log/"+ GetCourseText() + "/" + GetSchoolNum(device,course) + ".txt", log_data);
  console.log("question complete");
  res.json(response);
});

function QuestData(body) {
  return [body.device, body.course, body.times];
}

function GetCourseNameForLog(course) {
  switch (course) {
    case "soft1":
      return "ソフトウェア演習Ⅰ";
    case "soft2":
      return "ソフトウェア演習Ⅱ";
    case "softex":
      return "ソフトウェア演習ⅠorⅡ"
    default:
      try {
        throw new Error("Error:" + course);
      } catch (e) {
        console.log(e.message);
      }
  }
}

function GetCourseTimeForLog(times) {
  return "第" + times + "回";
}

function GetQuestion(course, times) {
  var questions = [];
  var question_number = [];
  var used_ranks = [0,0,0,0,0,0];
  const needs_rank = [2,2,4,2,2,1];
  const course_id = GetCourseIDFromTimes(times); 
  const course_dir = GetCourseDir(course) + times;  
  let next_course_dir;

  if (times == 10 || times == 12 ||
      times == 24 || times == 27){
    next_course_dir = GetCourseDir(course) + (times+2);
  }else{
    next_course_dir = GetCourseDir(course) + (times+1);
  }

  const max = fs.readdirSync(course_dir).length;
  const next_max = fs.readdirSync(next_course_dir).length;

  const timesForID = (times > 15 ? times - 15 : times)
  while(question_number.length < 12){
    
    while (true) {
      var tmp = course_id + (timesForID * 100 + Math.floor(Math.random() * max + 1)).toString();
      if (!question_number.includes(tmp)) {
        const question = ReadJSONFile(course_dir + '/' + tmp + '.json');
        if(used_ranks[question.rank - 1] < needs_rank[question.rank - 1]){
          question_number.push(tmp);
          questions.push(question);
          used_ranks[question.rank - 1] += 1;
          break;
        }else{
          continue;
        }
      }
    }
  }

  if (times == 10 || times == 12 ||
    times == 24 || times == 27){
    var extra_question_number = course_id + ((timesForID + 2)*100 + Math.floor(Math.random() * next_max + 1)).toString();
  }else if(times == 15){
    var extra_question_number = '2' + (100 + Math.floor(Math.random() * next_max + 1)).toString();
  }else{
    var extra_question_number = course_id + ((timesForID + 1)*100 + Math.floor(Math.random() * next_max + 1)).toString();
  }

  const extra_question = ReadJSONFile(next_course_dir + '/' + extra_question_number + '.json');
  question_number.push(extra_question);
  questions.push(extra_question);
  console.log("{\"quest\":" + questions + "}");
  return { "quest": questions };
}

function GetQuestionAndReview(course,times){
  var selected_times = times
  while(selected_times == 11 || selected_times == 13 || 
        selected_times == 25 || selected_times == 28){
      const rand = Math.random() * times + 1
      selected_times = Math.floor(rand)
  }
  return GetQuestion(course,selected_times);
}

function GetCourseIDFromTimes(times) {
  if(times <= 15){
    return '1'
  }else{
    return '2'
  }
}

router.post('/recommend', function(req, res, next){
  console.log(req.body);
  const device = req.body.device;
  const course = req.body.course;
  const times = req.body.times;
  const rank = req.body.rank;
  const recommend = req.body.recommend;

  var log_data = GenerateTimestamp() + " access recommend " + 
  "\"" + GetCourseNameForLog(course) + " " + 
  GetCourseTimeForLog(times) + " " +
  "rank:" + rank + " " +
  "recommend:" + recommend +
  "\" " + "\n";
  WriteAddFile(log_file, log_data);
  WriteAddFile("./log/"+ GetCourseText() + "/" + GetSchoolNum(device,course) + ".txt", log_data);
  console.log("recommend complete");
  res.json("recommend ok");
})


module.exports = router;
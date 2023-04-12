var express = require('express');
var router = express.Router();

const fs = require('fs');
const child_process = require("child_process");
const { WriteAddFile, GenerateTimestamp, GetSchoolNum, ReadJSONFile, GetCourseDir } = require('../library');
const log_file = "./log/soft2/log.txt";

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

  response = GetQuestion(course, times);
  for (i = 0; i < response.length; i++) {
    res_quest_id[i] = response[i].id;
  }

  var log_data = GenerateTimestamp() + " request question " + "\"" + GetCourseNameForLog(course) + " " + GetCourseTimeForLog(times) + "\" " + res_quest_id + "\n";
  WriteAddFile(log_file, log_data);
  WriteAddFile("./log/soft2/" + GetSchoolNum(device,course) + ".txt", log_data);
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
  var course_id = GetCourseIDFromCourse(course); 
  const course_dir = GetCourseDir(course) + times;
  const next_course_dir = GetCourseDir(course) + (times+1);
  const max = fs.readdirSync(course_dir).length;
  const next_max = fs.readdirSync(next_course_dir).length;
  while(question_number.length < 12){
    while (true) {
      var tmp = course_id + (times * 100 + Math.floor(Math.random() * max + 1)).toString();
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
    console.log(course_dir + '/' + question_number[question_number.length-1] + '.json');
    console.log(questions[questions.length-1]);
  }
  const extra_question_number = course_id + ((times + 1)*100 + Math.floor(Math.random() * next_max + 1)).toString();
  const extra_question = ReadJSONFile(next_course_dir + '/' + extra_question_number + '.json');
  question_number.push(extra_question);
  questions.push(extra_question);
  console.log("{\"quest\":" + questions + "}");
  return { "quest": questions };
}

function GetCourseIDFromCourse(course) {
  switch (course) {
    case "soft1":
      course_id = '1';
      break;
    case "soft2":
      course_id = '2';
      break;
    default:
      try {
        throw new Error("Error:" + course + times);
      } catch (e) {
        console.log(e.message);
      }
  }
  return course_id;
}


module.exports = router;
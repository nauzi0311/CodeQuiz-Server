var express = require('express');
var router = express.Router();

const fs = require('fs');
const child_process = require("child_process");
const { WriteAddFile, GenerateTimestamp, GetSchoolNum, ReadJSONFile } = require('../library');
const log_file = "./log/soft1/log.txt";

/* POST users listing. */
/* to get question
  process json like{"device": "uuid","course" : "soft1", "times" : 1}
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
  WriteAddFile("./log/soft1/" + GetSchoolNum(device,course) + ".txt", log_data);
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
  var course_id;
  switch (course) {
    case "soft1":
      course_id = '1';
      break;
    default:
      try {
        throw new Error("Error:" + course + times);
      } catch (e) {
        console.log(e.message);
      }
  }
  const course_dir = './data/' + course + '/' + times;
  const file_count = fs.readdirSync(course_dir).length;
  var question_number = GetRandom7Num(file_count);
  for (i = 0; i < question_number.length; i++) {
    question_number[i] = course_id + (times * 100 + question_number[i]).toString();
    console.log(course_dir + '/' + question_number[i] + '.json');
    questions[i] = ReadJSONFile(course_dir + '/' + question_number[i] + '.json');
    console.log(questions[i]);
  }
  console.log(questions);
  console.log("{\"quest\":" + questions + "}");
  return { "quest": questions };
}

function GetRandom7Num(max) {
  var randoms = [];
  for (i = 0; i < 7; i++) {
    while (true) {
      var tmp = Math.floor(Math.random() * max + 1);
      if (!randoms.includes(tmp)) {
        randoms.push(tmp);
        break;
      }
    }
  }
  return randoms;
}


module.exports = router;